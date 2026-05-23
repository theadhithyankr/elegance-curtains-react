import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
const HERO_BASE = '/hero.png';

export default function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '20%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.05, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '-30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], reduced ? [1, 1] : [1, 0]);

  const [hasSeen] = useState(() =>
    typeof window !== 'undefined' &&
    sessionStorage.getItem('elegance-curtain-pulled') === '1'
  );
  useEffect(() => {
    const t = setTimeout(() => {
      sessionStorage.setItem('elegance-curtain-pulled', '1');
    }, 2800);
    return () => clearTimeout(t);
  }, []);

  const curtainEase = [0.76, 0, 0.24, 1];
  const curtainDuration = reduced ? 0.01 : hasSeen ? 0.7 : 2.4;
  const curtainDelay = reduced ? 0 : hasSeen ? 0.05 : 0.2;
  const textDelay = reduced ? 0 : hasSeen ? 0.4 : 2.4;

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-obsidian"
    >
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <img
          src={HERO_BASE}
          alt="Elegant curtains and blinds"
          className="h-full w-full object-cover opacity-80"
          decoding="sync"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-obsidian/30 to-obsidian/80" />
      </motion.div>

      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ duration: curtainDuration, ease: curtainEase, delay: curtainDelay }}
        className="absolute inset-y-0 left-0 z-20 w-1/2 origin-left"
        style={{
          background:
            'linear-gradient(90deg, #000000 0%, #070708 60%, #0F0F11 100%)',
          boxShadow: 'inset -40px 0 80px rgba(0,0,0,0.7)',
        }}
      >
        <CurtainFolds />
        <CurtainTrim side="left" />
      </motion.div>

      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ duration: curtainDuration, ease: curtainEase, delay: curtainDelay }}
        className="absolute inset-y-0 right-0 z-20 w-1/2 origin-right"
        style={{
          background:
            'linear-gradient(270deg, #000000 0%, #070708 60%, #0F0F11 100%)',
          boxShadow: 'inset 40px 0 80px rgba(0,0,0,0.7)',
        }}
      >
        <CurtainFolds />
        <CurtainTrim side="right" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-end pb-16 text-warmwhite sm:pb-24"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: textDelay, ease: [0.22, 1, 0.36, 1] }}
          className="px-4 text-center font-serif text-[14vw] leading-[0.95] tracking-tight sm:text-[12vw] md:text-[8.5vw]"
        >
          <span className="block">Light, draped</span>
          <span className="block italic font-light text-champagne">
            with elegance.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: textDelay + 0.6, ease: 'easeOut' }}
          className="mt-6 max-w-md px-8 text-center text-[13px] font-light leading-relaxed text-warmwhite/75 sm:mt-8 sm:text-sm"
        >
          Curtains, blinds and window treatments —
          <span className="font-serif italic text-champagne"> expertly chosen</span> and fitted for your home.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: textDelay + 1.2 }}
          className="mt-10 flex flex-col items-center gap-3 text-[10px] uppercase tracking-widest2 text-warmwhite/70 sm:mt-16"
        >
          <span>Scroll</span>
          <motion.span
            animate={reduced ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="block h-8 w-px bg-champagne/70 sm:h-10"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function CurtainFolds() {
  const stripes = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none absolute inset-0 opacity-50">
      {stripes.map((_, i) => (
        <div
          key={i}
          style={{
            left: `${(i / stripes.length) * 100}%`,
            width: `${100 / stripes.length}%`,
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(201,165,92,0.04) 50%, rgba(0,0,0,0.45) 100%)',
          }}
          className="absolute inset-y-0"
        />
      ))}
    </div>
  );
}

function CurtainTrim({ side }) {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 w-px bg-champagne/40"
      style={side === 'left' ? { right: 0 } : { left: 0 }}
    />
  );
}
