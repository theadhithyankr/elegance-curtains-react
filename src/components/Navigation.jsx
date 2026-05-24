import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Wordmark from './Wordmark.jsx';
import MagneticButton from './MagneticButton.jsx';
import { useBooking } from '../context/BookingContext.jsx';

export default function Navigation() {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 200],
    ['rgba(7,7,8,0)', 'rgba(7,7,8,0.85)']
  );
  const border = useTransform(
    scrollY,
    [0, 200],
    ['rgba(201,165,92,0)', 'rgba(201,165,92,0.25)']
  );

  const [open, setOpen] = useState(false);
  const { openBooking } = useBooking();

  const links = [
    { href: '#collections', label: 'Store' },
    { href: '#fabrics', label: 'Fabrics' },
    { href: '#installations', label: 'Installations' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <motion.header
      style={{ backgroundColor: bg, borderColor: border }}
      className="fixed inset-x-0 top-0 z-50 border-b text-warmwhite backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-8 sm:py-6 md:px-14">
        <a href="#" className="block" onClick={() => setOpen(false)}>
          <Wordmark size="sm" hoverable />
        </a>

        {/* Desktop nav */}
        <nav className="hidden gap-10 text-[11px] uppercase tracking-widest2 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-champagne transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <MagneticButton className="hidden md:inline-block">
            <button
              onClick={openBooking}
              className="border border-champagne px-5 py-2 text-[11px] uppercase tracking-widest2 text-champagne transition-colors hover:bg-champagne hover:text-obsidian"
            >
              Book a Consultation
            </button>
          </MagneticButton>

          {/* Mobile burger */}
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span
              className={`absolute h-px w-6 bg-champagne transition-transform duration-300 ${
                open ? 'rotate-45' : '-translate-y-1.5'
              }`}
            />
            <span
              className={`absolute h-px w-6 bg-champagne transition-transform duration-300 ${
                open ? '-rotate-45' : 'translate-y-1.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-champagne/15 bg-void/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col gap-5 px-6 py-8 text-sm uppercase tracking-widest2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-warmwhite hover:text-champagne transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  openBooking();
                }}
                className="mt-3 self-start border border-champagne px-5 py-3 text-[11px] uppercase tracking-widest2 text-champagne hover:bg-champagne hover:text-obsidian transition-colors"
              >
                Book a Consultation
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

