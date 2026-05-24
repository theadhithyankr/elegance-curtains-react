import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageLightbox from './ImageLightbox.jsx';

const INSTALLATIONS = [
  {
    title: 'Sheer Curtain',
    type: 'Lightweight · diffuses light softly',
    category: 'Curtains',
    image: '/products/sheer-curtain.png',
  },
  {
    title: 'Blackout Curtain',
    type: 'Complete light block · restful sleep',
    category: 'Curtains',
    image: '/products/blackout-curtain.png',
  },
  {
    title: 'Pleated Curtain',
    type: 'Tailored folds · structured silhouette',
    category: 'Curtains',
    image: '/products/pleated-curtain.png',
  },
  {
    title: 'Layered Curtain',
    type: 'Sheer and blackout · combined track',
    category: 'Curtains',
    image: '/products/layered-curtain.png',
  },
  {
    title: 'Roman Blinds',
    type: 'Soft fabric folds · timeless finish',
    category: 'Blinds',
    image: '/products/roman-blind-2.jpg',
  },
  {
    title: 'Venetian Blinds',
    type: 'Angled slats · precise light control',
    category: 'Blinds',
    image: '/products/venetian-blinds-2.png',
  },
  {
    title: 'Vertical Blinds',
    type: 'Floor-to-ceiling · wide window coverage',
    category: 'Blinds',
    image: '/products/vertical-blind-2.png',
  },
  {
    title: 'Curtains',
    type: 'Custom made · perfectly fitted',
    category: 'Curtains',
    image: '/products/curtains-bg.png',
  },
];

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HorizontalPortfolio() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [previewOpen, setPreviewOpen] = useState(false);

  const go = (next) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  const prev = () => go(index === 0 ? INSTALLATIONS.length - 1 : index - 1);
  const next = () => go(index === INSTALLATIONS.length - 1 ? 0 : index + 1);

  const item = INSTALLATIONS[index];

  return (
    <section
      id="installations"
      className="relative bg-onyx py-24 md:py-32 px-6 md:px-12 lg:px-20"
    >
      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-10 md:mb-14">
        <div>
          <p className="mb-2 font-serif italic text-champagne text-xs sm:text-sm">
            — Our Installations · Curtains &amp; Blinds —
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-warmwhite">
            Rooms we have{' '}
            <span className="italic font-light text-champagne">dressed.</span>
          </h2>
        </div>

        {/* Arrow controls */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous installation"
            className="w-11 h-11 border border-champagne/30 flex items-center justify-center text-champagne hover:bg-champagne hover:text-obsidian transition-colors duration-300"
          >
            ←
          </button>
          <button
            onClick={next}
            aria-label="Next installation"
            className="w-11 h-11 border border-champagne/30 flex items-center justify-center text-champagne hover:bg-champagne hover:text-obsidian transition-colors duration-300"
          >
            →
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.figure
            key={index}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="group relative w-full overflow-hidden bg-coal ring-1 ring-champagne/20"
            onPanEnd={(_, info) => {
              if (info.offset.x < -50) next();
              else if (info.offset.x > 50) prev();
            }}
          >
            {/* Category badge */}
            <span className="absolute left-4 top-4 z-10 border border-champagne/50 bg-void/60 px-3 py-1 text-[10px] uppercase tracking-widest2 text-champagne backdrop-blur-sm sm:left-6 sm:top-6">
              {item.category}
            </span>

            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="relative block w-full overflow-hidden h-[55vw] max-h-[70vh] min-h-[280px] text-left"
              aria-label={`View ${item.title}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
              <span className="absolute bottom-5 right-5 border border-champagne/45 bg-void/65 px-3 py-1.5 text-[10px] uppercase tracking-widest2 text-champagne opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                View
              </span>
            </button>

            <figcaption className="flex items-end justify-between gap-4 px-6 py-6 sm:px-10 sm:py-8 md:px-12">
              <div>
                <p className="font-serif italic text-champagne text-sm">
                  0{index + 1} / 0{INSTALLATIONS.length}
                </p>
                <h3 className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl text-warmwhite leading-tight">
                  {item.title}
                </h3>
              </div>
              <p className="hidden md:block text-right text-[11px] uppercase tracking-widest2 text-champagne/80 max-w-[14rem]">
                {item.type}
              </p>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Mobile arrows + dots */}
      <div className="mt-6 flex items-center justify-between md:justify-center md:gap-8">
        <button
          onClick={prev}
          aria-label="Previous installation"
          className="md:hidden w-10 h-10 border border-champagne/30 flex items-center justify-center text-champagne"
        >
          ←
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {INSTALLATIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to installation ${i + 1}`}
              className={`h-px transition-all duration-300 ${
                i === index ? 'w-8 bg-champagne' : 'w-3 bg-warmwhite/25'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next installation"
          className="md:hidden w-10 h-10 border border-champagne/30 flex items-center justify-center text-champagne"
        >
          →
        </button>
      </div>

      <ImageLightbox
        open={previewOpen}
        items={INSTALLATIONS}
        index={index}
        onClose={() => setPreviewOpen(false)}
        onIndexChange={go}
      />
    </section>
  );
}
