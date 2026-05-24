import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useBooking } from '../context/BookingContext.jsx';
import { whatsappLink } from '../lib/contact.js';

/* A thin champagne action bar pinned to the bottom of mobile screens,
 * appearing only after the user has scrolled past the hero. */
export default function StickyMobileCTA() {
  const { scrollY } = useScroll();
  const { openBooking } = useBooking();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => {
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight - vh;
      setShow(v > vh * 0.8 && v < docH - vh * 0.5);
    });
    return () => unsub();
  }, [scrollY]);

  const quickPing = whatsappLink('Hello — I have a quick question about elegants.');

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-champagne/20 bg-void/95 px-4 py-3 backdrop-blur md:hidden"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.75rem)' }}
        >
          <a
            href={quickPing}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-warmwhite/80"
          >
            <WhatsAppGlyph /> Chat on WhatsApp
          </a>
          <button
            onClick={openBooking}
            className="bg-champagne px-5 py-2.5 text-[11px] uppercase tracking-widest2 text-obsidian"
          >
            Book Now
          </button>
        </motion.div>
      )}
    </AnimatePresence>
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
