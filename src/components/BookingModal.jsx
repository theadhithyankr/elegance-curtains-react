import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Wordmark from './Wordmark.jsx';
import { whatsappLink, WHATSAPP_DISPLAY } from '../lib/contact.js';

const PROJECT_TYPES = ['Curtains', 'Blinds', 'Both'];
const TIME_PREFS = ['Morning', 'Afternoon', 'Evening'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookingModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    windows: '',
    type: 'Curtains',
    time: 'Morning',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  const validate = (f) => {
    const e = {};
    if (!f.name.trim()) e.name = 'Please tell us your name.';
    if (!f.email.trim()) e.email = 'An email is needed for our reply.';
    else if (!EMAIL_RE.test(f.email.trim())) e.email = 'That email looks off.';
    return e;
  };
  const canSubmit = !validate(form).name && !validate(form).email;

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  // Reset state when reopening after a previous success
  useEffect(() => {
    if (!open && submitted) {
      const t = setTimeout(() => setSubmitted(false), 400);
      return () => clearTimeout(t);
    }
  }, [open, submitted]);

  const onChange = (k) => (e) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (fieldErrors.name || fieldErrors.email) {
      setErrors(fieldErrors);
      return;
    }
    const message = [
      '*New Consultation Request — Elegant Curtains and Blinds*',
      '',
      `*Name:* ${form.name}`,
      `*Email:* ${form.email}`,
      `*Phone:* ${form.phone || '—'}`,
      `*Postcode:* ${form.postcode || '—'}`,
      `*Approx. windows:* ${form.windows || '—'}`,
      `*Project type:* ${form.type}`,
      `*Preferred callback:* ${form.time}`,
      '',
      '*Notes:*',
      form.notes || '—',
    ].join('\n');
    // Opens WhatsApp (app on mobile, web on desktop) with the message ready to send.
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-h-[92vh] overflow-y-auto bg-obsidian text-warmwhite ring-1 ring-champagne/30 sm:max-w-xl sm:rounded-sm"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  'radial-gradient(ellipse at top right, rgba(201,165,92,0.18) 0%, rgba(7,7,8,0) 60%)',
              }}
            />

            <button
              aria-label="Close booking form"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center text-champagne hover:text-warmwhite transition-colors"
            >
              <span className="relative block h-px w-5 rotate-45 bg-current" />
              <span className="absolute h-px w-5 -rotate-45 bg-current" />
            </button>

            <div className="relative px-6 py-10 sm:px-10 sm:py-12">
              {!submitted ? (
                <>
                  <p className="mb-2 font-serif italic text-champagne text-sm">
                    — Concierge Intake · via WhatsApp —
                  </p>
                  <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
                    Book a Consultation
                  </h2>
                  <p className="mt-3 text-sm font-light leading-relaxed text-warmwhite/70">
                    Tell us about your space. On submit, your answers open in WhatsApp ready to send to our atelier at{' '}
                    <span className="text-champagne">{WHATSAPP_DISPLAY}</span>. We reply within one working day.
                  </p>

                  <form
                    onSubmit={onSubmit}
                    className="mt-8 grid gap-5 sm:grid-cols-2"
                  >
                    <Field label="Full Name" required error={errors.name}>
                      <input
                        value={form.name}
                        onChange={onChange('name')}
                        className={inputCls(errors.name)}
                      />
                    </Field>
                    <Field label="Email" required error={errors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={onChange('email')}
                        className={inputCls(errors.email)}
                      />
                    </Field>
                    <Field label="Phone">
                      <input
                        value={form.phone}
                        onChange={onChange('phone')}
                        className={inputCls()}
                      />
                    </Field>
                    <Field label="Postcode">
                      <input
                        value={form.postcode}
                        onChange={onChange('postcode')}
                        className={inputCls()}
                      />
                    </Field>
                    <Field label="Approx. windows">
                      <input
                        type="number"
                        min="1"
                        value={form.windows}
                        onChange={onChange('windows')}
                        className={inputCls()}
                      />
                    </Field>
                    <Field label="Project type">
                      <select
                        value={form.type}
                        onChange={onChange('type')}
                        className={`${inputCls()} appearance-none pr-8`}
                      >
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t} className="bg-obsidian">
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Preferred callback" className="sm:col-span-2">
                      <div className="flex flex-wrap gap-2">
                        {TIME_PREFS.map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setForm((f) => ({ ...f, time: t }))}
                            className={`px-4 py-2 text-[11px] uppercase tracking-widest2 border transition-colors ${
                              form.time === t
                                ? 'bg-champagne text-obsidian border-champagne'
                                : 'border-champagne/40 text-warmwhite/80 hover:border-champagne'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </Field>
                    <Field label="Notes" className="sm:col-span-2">
                      <textarea
                        rows={3}
                        value={form.notes}
                        onChange={onChange('notes')}
                        placeholder="Tell us about the space, style references, or timing…"
                        className={`${inputCls()} resize-none`}
                      />
                    </Field>

                    <div className="sm:col-span-2 mt-2 flex flex-col items-center gap-4">
                      <button
                        type="submit"
                        aria-disabled={!canSubmit}
                        className={`inline-flex items-center gap-2 bg-champagne px-8 py-3 text-[11px] uppercase tracking-widest2 text-obsidian transition-all hover:bg-warmwhite ${
                          canSubmit ? '' : 'opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <WhatsAppGlyph />
                        Send via WhatsApp
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="py-8 text-center"
                >
                  <p className="font-serif italic text-champagne">— WhatsApp opened —</p>
                  <h3 className="mt-4 font-serif text-3xl">Almost there, {form.name.split(' ')[0] || 'friend'}.</h3>
                  <p className="mt-4 text-sm font-light leading-relaxed text-warmwhite/70">
                    Your enquiry is queued in WhatsApp — just tap{' '}
                    <span className="text-champagne">Send</span> to deliver it to our atelier at{' '}
                    <a
                      href={whatsappLink('Hello — I just sent an enquiry through your website.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-champagne"
                    >
                      {WHATSAPP_DISPLAY}
                    </a>
                    . We reply within one working day.
                  </p>
                  <div className="mt-8">
                    <Wordmark size="sm" className="text-warmwhite/80" />
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-8 border border-champagne px-6 py-3 text-[11px] uppercase tracking-widest2 text-champagne hover:bg-champagne hover:text-obsidian transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function inputCls(error) {
  return [
    'w-full bg-transparent border-b px-0 py-2 text-sm text-warmwhite outline-none transition-colors placeholder:text-warmwhite/30',
    error ? 'border-red-400/70 focus:border-red-400' : 'border-champagne/30 focus:border-champagne',
  ].join(' ');
}

function Field({ label, children, required, error, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="block mb-1 text-[10px] uppercase tracking-widest2 text-champagne/80">
        {label}
        {required && <span className="text-champagne"> *</span>}
      </span>
      {children}
      {error && (
        <motion.span
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: [4, -4, 3, -3, 0] }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mt-1 block font-serif italic text-[11px] text-red-300/90"
        >
          {error}
        </motion.span>
      )}
    </label>
  );
}

function WhatsAppGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1s-.4-.1-.6.1-.7.9-.9 1.1-.3.2-.6 0c-1.7-.8-2.8-1.5-4-3.4-.3-.5.3-.5.9-1.6.1-.2.1-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4S6 7.8 6 9.2s1.1 2.8 1.2 3 2 3.4 5 4.6c1.9.8 2.6.9 3.5.8.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.5-.4zM12 .8C5.8.8.8 5.8.8 12c0 2 .5 3.8 1.5 5.5L.8 23.2l5.8-1.5c1.6.9 3.5 1.4 5.4 1.4 6.2 0 11.2-5 11.2-11.2S18.2.8 12 .8zm0 20.4c-1.7 0-3.4-.5-4.9-1.3l-.4-.2-3.6.9.9-3.5-.2-.4C2.8 15.2 2.3 13.6 2.3 12 2.3 6.6 6.6 2.3 12 2.3c2.6 0 5 1 6.8 2.8 1.8 1.8 2.8 4.2 2.8 6.8.1 5.4-4.3 9.3-9.6 9.3z" />
    </svg>
  );
}
