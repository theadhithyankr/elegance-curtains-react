import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { whatsappLink, PHONE_NUMBER, WHATSAPP_DISPLAY } from '../lib/contact.js';

const WA_LINK = whatsappLink("Hello — I'd like to enquire about your curtains and blinds.");

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [pulseDone, setPulseDone] = useState(false);
  const ref = useRef(null);

  // Stop pulse ring after 3 s
  useEffect(() => {
    const t = setTimeout(() => setPulseDone(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <div
      ref={ref}
      className="fixed bottom-[4.5rem] right-4 z-50 flex flex-col items-end gap-3 md:bottom-8 md:right-8"
    >
      {/* Popup card */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-64 rounded-2xl border border-champagne/20 bg-obsidian shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-4 border-b border-champagne/10">
              <p className="font-serif text-warmwhite text-[15px] leading-snug">
                How can we help?
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-widest text-warmwhite/45">
                We respond within the hour
              </p>
            </div>

            {/* Actions */}
            <div className="p-3 flex flex-col gap-2">
              {/* WhatsApp */}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl bg-[#25D366] px-4 py-3 text-white transition-opacity hover:opacity-90"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-[13px] font-medium tracking-wide">Chat on WhatsApp</span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                className="flex items-center gap-3 rounded-xl border border-champagne/25 px-4 py-3 text-champagne transition-colors hover:bg-champagne/5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .9h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <div>
                  <span className="block text-[13px] font-medium tracking-wide">Call Us</span>
                  <span className="block text-[11px] text-champagne/55 mt-0.5">{PHONE_NUMBER}</span>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB trigger button */}
      <div className="relative">
        {/* Pulse ring — stops after 3 s */}
        {!pulseDone && !open && (
          <span className="absolute inset-0 rounded-full animate-ping bg-champagne/30 pointer-events-none" />
        )}

        <motion.button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close contact options' : 'Open contact options'}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full border border-champagne/30 bg-obsidian shadow-lg text-champagne"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </motion.svg>
            ) : (
              <motion.svg
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                strokeLinejoin="round" aria-hidden="true"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
