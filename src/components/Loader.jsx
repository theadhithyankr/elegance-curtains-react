import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Wordmark from './Wordmark.jsx';

/* Brand intro overlay — fades in the wordmark, then lifts away to let
 * the Hero curtain pull begin. Skipped on subsequent visits this session. */
export default function Loader({ onComplete }) {
  const reduced = useReducedMotion();
  const seen =
    typeof window !== 'undefined' && sessionStorage.getItem('elegance-seen') === '1';
  const [visible, setVisible] = useState(!seen);

  useEffect(() => {
    if (!visible) {
      onComplete?.();
      return;
    }
    const duration = reduced ? 600 : 1900;
    const t = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('elegance-seen', '1');
      onComplete?.();
    }, duration);
    return () => clearTimeout(t);
  }, [visible, reduced, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-obsidian text-warmwhite"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <Wordmark
              size="md"
              className="tracking-normal text-2xl sm:text-3xl"
            />
          </motion.div>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduced ? 0.3 : 1.4, delay: 0.3, ease: 'easeInOut' }}
            className="mt-6 block h-px w-32 origin-left bg-champagne"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
