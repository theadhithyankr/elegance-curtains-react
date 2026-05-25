import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ITEMS = [
  {
    name: 'Linen',
    category: 'Curtain Fabric',
    tagline: 'Sun, softened.',
    description:
      'Belgian flax, loosely woven and air-washed. Breathes and diffuses daylight into a warm, honeyed glow.',
    image: '/materials/curtain-linen-material-image.jpg',
    colorways: [
      { name: 'Bone',   hex: '#E8DDC8' },
      { name: 'Oat',   hex: '#C8B89B' },
      { name: 'Clay',  hex: '#A78766' },
      { name: 'Smoke', hex: '#6F6A60' },
      { name: 'Indigo',hex: '#2C3A4E' },
    ],
  },
  {
    name: 'Velvet',
    category: 'Curtain Fabric',
    tagline: 'Depth, drawn close.',
    description:
      'Short-pile cotton velvet. Catches the light in long, slow gradients — turning a window into the softest moment of the room.',
    image: '/materials/curtain-velvet-material-image.jpg',
    colorways: [
      { name: 'Forest',   hex: '#1F3A2E' },
      { name: 'Plum',     hex: '#3F1F36' },
      { name: 'Burgundy', hex: '#5A1B25' },
      { name: 'Midnight', hex: '#0F1A2E' },
      { name: 'Cognac',   hex: '#7A4B2A' },
    ],
  },
  {
    name: 'Silk',
    category: 'Curtain Fabric',
    tagline: 'A whisper of light.',
    description:
      'Mulberry silk organza, almost weightless. Hangs in long vertical lines that lift gently with the air.',
    image: '/materials/curtain-silk-material-image.jpg',
    colorways: [
      { name: 'Pearl',     hex: '#EDE6D6' },
      { name: 'Champagne', hex: '#C9A55C' },
      { name: 'Rose',      hex: '#D5B0A6' },
      { name: 'Ice',       hex: '#C5D2D8' },
    ],
  },
  {
    name: 'Wood',
    category: 'Blind Material',
    tagline: 'Light, set to rhythm.',
    description:
      'Hand-finished basswood slats with woven tape ladders. Privacy, sunlight and air, dialled by the inch.',
    image: '/materials/blind-wood-material-image.jpg',
    colorways: [
      { name: 'Natural Oak', hex: '#B89368' },
      { name: 'Smoked Oak',  hex: '#6E5640' },
      { name: 'Walnut',      hex: '#4A2F22' },
      { name: 'Ebony',       hex: '#1B1612' },
      { name: 'Bleached',    hex: '#D9C8AA' },
    ],
  },
  {
    name: 'Blackout',
    category: 'Curtain Fabric',
    description: 'Dense weave for complete light control — ideal for bedrooms and media rooms.',
    image: '/materials/curtain-blackout-fabric-material-image.jpg',
  },
  {
    name: 'Cotton',
    category: 'Curtain Fabric',
    description: 'Breathable, soft and easy to maintain. A reliable everyday fabric for any room.',
    image: '/materials/curtain-cotton-material-image.jpg',
  },
  {
    name: 'Sheer Fabric',
    category: 'Curtain Fabric',
    description: 'Lightweight voile that filters light softly while preserving an open feel.',
    image: '/materials/curtain-sheer-fabric-material-image.jpg',
  },
  {
    name: 'Aluminium',
    category: 'Blind Material',
    description: 'Slim, durable slats for clean modern interiors. Wipe-clean and long-lasting.',
    image: '/materials/blind-aluminum-material-image.jpg',
  },
  {
    name: 'Bamboo',
    category: 'Blind Material',
    description: 'Sustainable texture with an organic warmth. Lets light filter through naturally.',
    image: '/materials/blind-bamboo-material-image.jpg',
  },
  {
    name: 'Faux Wood',
    category: 'Blind Material',
    description: 'The look of real wood — moisture-resistant and practical for bathrooms and kitchens.',
    image: '/materials/blind-faux-wood-material-image.jpg',
  },
  {
    name: 'PVC / Vinyl',
    category: 'Blind Material',
    description: 'Wipe-clean and waterproof. The practical choice for high-humidity spaces.',
    image: '/materials/blind-pvc-vinyl-material-image.jpg',
  },
  {
    name: 'Solar Screen',
    category: 'Blind Material',
    description: 'Reduces glare and UV while preserving the view — perfect for offices and south-facing rooms.',
    image: '/materials/blind-solar-screen-mesh-material-image.jpg',
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

const INTERVAL = 4000;

export default function FabricScrollytelling() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  // Preload all slide images on mount so navigation is instant
  useEffect(() => {
    ITEMS.forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  const go = (next) => {
    clearInterval(timerRef.current);
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };
  const prev = () => go(index === 0 ? ITEMS.length - 1 : index - 1);
  const next = () => go(index === ITEMS.length - 1 ? 0 : index + 1);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setDir(1);
      setIndex((i) => (i === ITEMS.length - 1 ? 0 : i + 1));
    }, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paused, index]);

  const item = ITEMS[index];

  return (
    <section
      id="fabrics"
      className="relative min-h-[100dvh] bg-obsidian overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={index}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
          onPanEnd={(_, info) => {
            if (info.offset.x < -50) next();
            else if (info.offset.x > 50) prev();
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
            fetchpriority={index === 0 ? 'high' : 'low'}
          />
          {/* Vignette overlays */}
          <div className="img-overlay pointer-events-none absolute inset-0 bg-gradient-to-r from-void/85 via-void/30 to-void/60" />
          <div className="img-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />
        </motion.div>
      </AnimatePresence>

      {/* Text content */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col justify-between px-6 py-10 sm:px-10 md:px-16 md:py-14">

        {/* Section label */}
        <p className="font-serif italic text-champagne text-xs sm:text-sm">
          — Materials &amp; Blinds —
        </p>

        {/* Slide copy */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.3 } }}
            className="max-w-xl"
          >
            <p className="mb-3 font-sans text-[10px] uppercase tracking-widest2 text-champagne/80">
              {item.category}
            </p>
            <h2 className="font-serif text-[14vw] leading-[0.92] tracking-tight text-warmwhite sm:text-[10vw] md:text-[7vw]">
              {item.name}
            </h2>
            {item.tagline && (
              <p className="mt-3 font-serif italic text-champagne text-base sm:text-lg">
                {item.tagline}
              </p>
            )}
            <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-warmwhite/75 sm:mt-5 sm:text-base">
              {item.description}
            </p>

            {/* Colorway dots */}
            {item.colorways && (
              <div className="mt-6 flex items-center gap-2 sm:mt-8">
                {item.colorways.map((c) => (
                  <span
                    key={c.name}
                    title={c.name}
                    style={{ backgroundColor: c.hex }}
                    className="block h-4 w-4 rounded-full ring-1 ring-champagne/40 transition-transform hover:scale-125 sm:h-[18px] sm:w-[18px]"
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-between">
          {/* Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous material"
              className="w-10 h-10 border border-champagne/30 flex items-center justify-center text-champagne hover:bg-champagne hover:text-obsidian transition-colors duration-300"
            >
              ←
            </button>
            <button
              onClick={next}
              aria-label="Next material"
              className="w-10 h-10 border border-champagne/30 flex items-center justify-center text-champagne hover:bg-champagne hover:text-obsidian transition-colors duration-300"
            >
              →
            </button>
          </div>

          {/* Counter */}
          <p className="font-serif italic text-champagne/70 text-sm tabular-nums">
            {String(index + 1).padStart(2, '0')} / {String(ITEMS.length).padStart(2, '0')}
          </p>

          {/* Dots */}
          <div className="hidden sm:flex items-center gap-2">
            {ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to material ${i + 1}`}
                className={`h-px transition-all duration-300 ${
                  i === index ? 'w-8 bg-champagne' : 'w-3 bg-warmwhite/25'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
