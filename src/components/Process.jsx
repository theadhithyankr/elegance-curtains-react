import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const STEPS = [
  {
    n: '01',
    t: 'Consultation',
    d: 'A private appointment — at our studio or in your home — to understand the space, the light, and the way you live in it.',
  },
  {
    n: '02',
    t: 'Measure',
    d: 'Our installers survey every window to the millimetre, noting reveals, drops, and any architectural quirks worth dressing around.',
  },
  {
    n: '03',
    t: 'Selection',
    d: 'We help you find exactly the right curtain or blind — the style, the weight, the colour. We narrow the options until the choice feels right.',
  },
  {
    n: '04',
    t: 'Install',
    d: 'Tracks recessed, motors silenced, hardware finished to match. We leave the room better than we found it.',
  },
];

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%']);

  return (
    <section
      id="process"
      ref={ref}
      className="relative bg-onyx py-24 px-6 sm:py-32 sm:px-10 md:py-40 md:px-16"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mb-8 font-serif italic text-sm text-champagne md:mb-10">
          — How We Work —
        </p>
        <h2 className="font-serif text-[9vw] leading-[1.05] tracking-tight text-warmwhite sm:text-[7vw] md:text-[4.5vw]">
          Four steps,{' '}
          <span className="italic font-light text-champagne">no shortcuts.</span>
        </h2>

        <div className="relative mt-14 sm:mt-20">
          {/* Vertical timeline rail */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-champagne/15 sm:left-6" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-3 top-0 w-px bg-champagne sm:left-6"
          />

          <ol className="space-y-12 sm:space-y-16">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-10 sm:pl-16"
              >
                <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-obsidian ring-1 ring-champagne sm:left-3 sm:h-7 sm:w-7">
                  <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                </span>
                <div className="grid gap-2 md:grid-cols-[8rem_1fr] md:gap-10">
                  <p className="font-serif italic text-champagne">{s.n}</p>
                  <div>
                    <h3 className="font-serif text-2xl text-warmwhite sm:text-3xl">
                      {s.t}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm font-light leading-relaxed text-warmwhite/65 sm:mt-3 sm:text-base">
                      {s.d}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
