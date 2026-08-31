import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { EASE } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const LeadContext = createContext({ openLead: () => {} });
export const useLead = () => useContext(LeadContext);

const COPY = {
  prediction: {
    title: "Get a Delivery Prediction",
    sub: "Tell us where to reach you — we'll show you what your execution data says about your delivery dates.",
    cta: "Request Prediction",
  },
  demo: {
    title: "Book a Demo",
    sub: "See Pragmr connect planning, execution and delivery visibility — live, with your workflow in mind.",
    cta: "Book My Demo",
  },
};

export function LeadProvider({ children }) {
  const [state, setState] = useState({ open: false, type: "prediction" });
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const openLead = (type) => setState({ open: true, type });
  const close = () => setState((s) => ({ ...s, open: false }));

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await axios.post(`${API}/leads`, { ...form, lead_type: state.type });
      toast.success("Request received — we'll be in touch shortly.");
      setForm({ name: "", email: "", company: "", message: "" });
      close();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const copy = COPY[state.type];
  const inputCls =
    "w-full rounded-none border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-zinc-400 outline-none transition-colors duration-200 focus:border-ink";

  return (
    <LeadContext.Provider value={{ openLead }}>
      {children}
      <AnimatePresence>
        {state.open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-testid="lead-dialog"
          >
            <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={close} data-testid="lead-dialog-backdrop" />
            <motion.div
              className="relative w-full max-w-lg bg-white border border-line shadow-2xl"
              initial={{ y: 48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 32, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="flex items-start justify-between border-b border-line px-7 py-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand mb-2">
                    {state.type === "demo" ? "[ Demo ]" : "[ Prediction ]"}
                  </p>
                  <h3 className="font-display font-medium text-2xl tracking-tight text-ink" data-testid="lead-dialog-title">
                    {copy.title}
                  </h3>
                </div>
                <button onClick={close} data-testid="lead-close-button"
                  className="p-2 -m-1 text-zinc-400 transition-colors duration-200 hover:text-ink" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={submit} className="px-7 py-6 space-y-4" data-testid="lead-form">
                <p className="text-sm leading-relaxed text-zinc-500">{copy.sub}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required value={form.name} onChange={set("name")} placeholder="Full name"
                    className={inputCls} data-testid="lead-name-input" />
                  <input required type="email" value={form.email} onChange={set("email")} placeholder="Work email"
                    className={inputCls} data-testid="lead-email-input" />
                </div>
                <input value={form.company} onChange={set("company")} placeholder="Company (optional)"
                  className={inputCls} data-testid="lead-company-input" />
                <textarea value={form.message} onChange={set("message")} rows={3}
                  placeholder={state.type === "demo" ? "Anything we should prepare? (optional)" : "Tell us about your project (optional)"}
                  className={`${inputCls} resize-none`} data-testid="lead-message-input" />
                <button type="submit" disabled={submitting} data-testid="lead-submit-button"
                  className="group flex w-full items-center justify-center gap-3 bg-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-brand disabled:opacity-60">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : copy.cta}
                  {!submitting && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
                </button>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 text-center">
                  No commitment. No spam.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LeadContext.Provider>
  );
}
