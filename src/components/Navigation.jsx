import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Wordmark from './Wordmark.jsx';
import MagneticButton from './MagneticButton.jsx';
import { useBooking } from '../context/BookingContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScroll();
  const baseRgb = theme === 'light' ? '255,255,255' : '7,7,8';
  const accentRgb = theme === 'light' ? '109,40,217' : '201,165,92';
  const bg = useTransform(
    scrollY,
    [0, 200],
    [`rgba(${baseRgb},0)`, `rgba(${baseRgb},0.85)`]
  );
  const border = useTransform(
    scrollY,
    [0, 200],
    [`rgba(${accentRgb},0)`, `rgba(${accentRgb},0.25)`]
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
          <ThemeToggle theme={theme} onToggle={toggleTheme} />

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
            className="overflow-hidden border-t border-champagne/15 bg-obsidian/95 backdrop-blur-md md:hidden"
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

function ThemeToggle({ theme, onToggle }) {
  const isLight = theme === 'light';
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-champagne/30 text-champagne transition-colors hover:bg-champagne/10"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLight ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <MoonIcon />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <SunIcon />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}
