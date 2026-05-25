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
      className="relative min-h-[100dvh] w-full overflow-hidden bg-obsidian"
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
        <div className="img-overlay absolute inset-0 bg-gradient-to-b from-void/50 via-void/30 to-void/80" />
      </motion.div>

      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ duration: curtainDuration, ease: curtainEase, delay: curtainDelay }}
        className="absolute inset-y-0 left-0 z-20 w-1/2 origin-left"
        style={{
          background:
            'linear-gradient(90deg, var(--hero-curtain-a) 0%, var(--hero-curtain-b) 60%, var(--hero-curtain-c) 100%)',
          boxShadow: 'inset -40px 0 80px var(--hero-curtain-shadow)',
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
            'linear-gradient(270deg, var(--hero-curtain-a) 0%, var(--hero-curtain-b) 60%, var(--hero-curtain-c) 100%)',
          boxShadow: 'inset 40px 0 80px var(--hero-curtain-shadow)',
        }}
      >
        <CurtainFolds />
        <CurtainTrim side="right" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-end px-5 pb-12 text-warmwhite sm:pb-20"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: textDelay, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl text-center font-serif text-[13vw] leading-[0.95] tracking-tight sm:text-[10vw] md:text-[7.4vw]"
        >
          <span className="block">Custom curtains</span>
          <span className="block italic font-light text-champagne">
            and blinds.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: textDelay + 0.6, ease: 'easeOut' }}
          className="mt-5 max-w-xl text-center text-sm font-light leading-relaxed text-warmwhite/78 sm:mt-7 sm:text-base"
        >
          Curtains, blinds and window treatments -
          <span className="font-serif italic text-champagne"> selected, measured</span> and professionally fitted for your room.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: textDelay + 1 }}
          className="mt-5 text-center text-[10px] uppercase tracking-widest2 text-warmwhite/55"
        >
          Selection · Measurement · Installation
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: textDelay + 1.2 }}
          className="mt-8 flex flex-col items-center gap-3 text-[10px] uppercase tracking-widest2 text-warmwhite/60 sm:mt-12"
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
              'linear-gradient(90deg, var(--hero-fold-edge) 0%, var(--c-fold-stripe) 50%, var(--hero-fold-edge) 100%)',
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
