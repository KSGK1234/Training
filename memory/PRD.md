# PRD — Pragmr Landing Page

## Original Problem Statement
A 12-section marketing landing page for Pragmr, a delivery-confidence platform: (1) Hero "Predict Project Delivery Before Delays Happen" + Delivery Confidence dashboard visual; (2) Problem — 4 cards; (3) Root Cause — Capacity/Capability/Execution diagram flowing to Delivery Confidence; (4) Solution — Plan→Execute→Capture→Analyze→Predict→Adjust; (5) How It Works — Planner→Work Orders→Tasks→Kanban→Smart Assign→Milestones→Analytics; (6) Data Inputs — 8-signal table; (7) Delivery Confidence — 5 confidence cards; (8) Use Cases; (9) Product Experience — 6 product mockups; (10) Business Outcomes — 4 cards; (11) Trust/Proof — no manufactured stats; (12) Final CTA with working "Get a Delivery Prediction" + "Book a Demo" forms.

## User Personas
- Owners/PMO leads of project-based service businesses evaluating Pragmr
- Engineering / consulting / digital-services delivery leads
- Prospects requesting a delivery prediction or a demo (lead capture)

## Architecture
- Frontend: React 19 + Tailwind, framer-motion (masked line reveals, scroll reveals, hero tilt), lenis smooth scroll, react-fast-marquee (proof marquee). Swiss-grid / data-instrument art direction (Cabinet Grotesk + Satoshi + IBM Plex Mono; ink #111, paper #F9F9F9, brand #0047FF).
- Backend: FastAPI + MongoDB (motor). POST /api/leads (public lead capture, type prediction|demo), GET /api/leads. Email via Emergent managed Resend proxy (guardrail gate included) — owner notification + lead confirmation.
- Env: backend/.env holds EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME=Pragmr, OWNER_EMAIL.

## Implemented (2026-08-31)
- All 12 sections with exact copy from brief, numbered manifesto headers, exposed grid lines
- Kinetic hero: masked line-by-line headline, tilting Delivery Confidence dashboard mockup (code-built), parallax on scroll
- Root-cause signal diagram with animated connectors; solution flow; module chain; data-signal table; 5 instrument gauges; use cases with photography; 6 code-built product mockups (placeholders for real screenshots); outcomes; proof marquee; dark final CTA
- Lead forms (both CTAs) save to MongoDB and trigger email notification + confirmation
- Verified: API create/list leads, form submit e2e via UI, all sections screenshot-checked

## Pending / Notes
- OWNER_EMAIL is a placeholder (delivered@resend.dev) — user must provide their real notification email
- Product screenshots + hero image: user said they will upload; currently stylized code mockups
- GET /api/leads is unauthenticated (fine for preview; add auth before production use)

## Backlog
- P0: Swap in real product screenshots / hero image when user uploads them
- P0: Set real OWNER_EMAIL for lead notifications
- P1: Testimonials / real proof metrics once available
- P1: Mobile nav menu (links hidden on small screens)
- P2: Case study page, blog/insights section, multi-language
