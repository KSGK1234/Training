from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import uuid
import logging
import ipaddress
import httpx
from pathlib import Path
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Literal
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "")

# --- Email guardrail gate (G2/G3 structural checks) ---
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: Optional[str] = None) -> Optional[str]:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to:
        payload["contact_email"] = reply_to
    async with httpx.AsyncClient(timeout=30) as client_http:
        resp = await client_http.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


# --- Models ---
class LeadCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default="", max_length=160)
    message: Optional[str] = Field(default="", max_length=2000)
    lead_type: Literal["prediction", "demo"]


class Lead(BaseModel):
    id: str
    name: str
    email: EmailStr
    company: str
    message: str
    lead_type: str
    created_at: str


def _cell(k: str, v: str) -> str:
    return (f'<tr><td style="padding:10px 14px;border:1px solid #e4e4e7;font-size:13px;color:#71717a;'
            f'text-transform:uppercase;letter-spacing:0.08em">{k}</td>'
            f'<td style="padding:10px 14px;border:1px solid #e4e4e7;font-size:14px;color:#111111">{v}</td></tr>')


@api_router.get("/")
async def root():
    return {"message": "Pragmr API"}


@api_router.post("/leads", status_code=201)
async def create_lead(input: LeadCreate):
    lead_id = str(uuid.uuid4())
    created = datetime.now(timezone.utc).isoformat()
    doc = {
        "id": lead_id,
        "name": input.name.strip(),
        "email": str(input.email),
        "company": (input.company or "").strip(),
        "message": (input.message or "").strip(),
        "lead_type": input.lead_type,
        "created_at": created,
    }
    await db.leads.insert_one(doc)

    label = "Delivery Prediction" if input.lead_type == "prediction" else "Demo"
    name_e = escape(doc["name"])
    email_e = escape(doc["email"])
    company_e = escape(doc["company"]) or "—"
    message_e = escape(doc["message"]) or "—"

    if OWNER_EMAIL:
        owner_html = (
            '<table role="presentation" width="100%" style="font-family:Arial,sans-serif">'
            f'<tr><td style="padding:24px"><p style="font-size:12px;letter-spacing:0.15em;color:#0047FF;'
            f'text-transform:uppercase">New lead — {escape(EMAIL_FROM_NAME)}</p>'
            f'<h2 style="margin:8px 0 16px;font-size:20px;color:#111111">{label} request</h2>'
            '<table role="presentation" style="border-collapse:collapse">'
            + _cell("Type", label)
            + _cell("Name", name_e)
            + _cell("Email", email_e)
            + _cell("Company", company_e)
            + _cell("Message", message_e)
            + _cell("Submitted", escape(created))
            + '</table>'
            f'<p style="font-size:12px;color:#a1a1aa;margin-top:20px">Sent by {escape(EMAIL_FROM_NAME)} lead capture.</p>'
            '</td></tr></table>'
        )
        try:
            await send_email(to=OWNER_EMAIL, subject=f"New {label} request — {doc['name']}", html=owner_html,
                             reply_to=doc["email"])
        except Exception as e:
            logger.error(f"Owner notification email failed: {e}")

    confirm_html = (
        '<table role="presentation" width="100%" style="font-family:Arial,sans-serif">'
        f'<tr><td style="padding:24px"><p style="font-size:12px;letter-spacing:0.15em;color:#0047FF;'
        f'text-transform:uppercase">{escape(EMAIL_FROM_NAME)}</p>'
        f'<h2 style="margin:8px 0 16px;font-size:20px;color:#111111">We received your request</h2>'
        f'<p style="font-size:14px;color:#3f3f46;line-height:1.6">Hi {name_e}, thanks for your interest in '
        f'{escape(EMAIL_FROM_NAME)}. Your {label.lower()} request is in — our team will get back to you shortly.</p>'
        f'<p style="font-size:12px;color:#a1a1aa;margin-top:20px">Sent by {escape(EMAIL_FROM_NAME)}. '
        'We never ask for passwords or card details by email.</p>'
        '</td></tr></table>'
    )
    try:
        await send_email(to=doc["email"], subject=f"Your {label.lower()} request — {EMAIL_FROM_NAME}",
                         html=confirm_html)
    except Exception as e:
        logger.error(f"Lead confirmation email failed: {e}")

    return {"status": "success", "id": lead_id}


@api_router.get("/leads", response_model=List[Lead])
async def list_leads():
    return await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
