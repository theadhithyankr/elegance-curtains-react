import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CURTAIN_MATERIALS = [
  {
    name: 'Blackout Fabric',
    img: '/materials/curtain-blackout-fabric-material-image.jpg',
    desc: 'Dense weave for complete light control',
  },
  {
    name: 'Cotton',
    img: '/materials/curtain-cotton-material-image.jpg',
    desc: 'Breathable, soft and easy to maintain',
  },
  {
    name: 'Linen',
    img: '/materials/curtain-linen-material-image.jpg',
    desc: 'Natural texture with an airy, relaxed drape',
  },
  {
    name: 'Sheer Fabric',
    img: '/materials/curtain-sheer-fabric-material-image.jpg',
    desc: 'Lightweight voile that filters light softly',
  },
  {
    name: 'Silk',
    img: '/materials/curtain-silk-material-image.jpg',
    desc: 'Lustrous finish with a fluid, elegant hang',
  },
  {
    name: 'Velvet',
    img: '/materials/curtain-velvet-material-image.jpg',
    desc: 'Rich pile that absorbs light and adds warmth',
  },
];

const BLIND_MATERIALS = [
  {
    name: 'Real Wood',
    img: '/materials/blind-wood-material-image.jpg',
    desc: 'Warm grain tones, natural and timeless',
  },
  {
    name: 'Aluminium',
    img: '/materials/blind-aluminum-material-image.jpg',
    desc: 'Slim, durable slats for modern interiors',
  },
  {
    name: 'Bamboo',
    img: '/materials/blind-bamboo-material-image.jpg',
    desc: 'Sustainable texture with an organic warmth',
  },
  {
    name: 'Faux Wood',
    img: '/materials/blind-faux-wood-material-image.jpg',
    desc: 'Wood look, moisture-resistant for wet rooms',
  },
  {
    name: 'PVC / Vinyl',
    img: '/materials/blind-pvc-vinyl-material-image.jpg',
    desc: 'Wipe-clean, practical for high-humidity spaces',
  },
  {
    name: 'Solar Screen',
    img: '/materials/blind-solar-screen-mesh-material-image.jpg',
    desc: 'Reduces glare while preserving the view',
  },
];

const TABS = [
  { label: 'Curtain Fabrics', data: CURTAIN_MATERIALS },
  { label: 'Blind Materials', data: BLIND_MATERIALS },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

function MaterialCard({ name, img, desc, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="group relative overflow-hidden rounded-sm bg-coal shrink-0 w-[75vw] sm:w-auto"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <motion.img
          src={img}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coal/70 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="px-5 py-4">
        <h3 className="font-serif text-base text-champagne leading-snug">{name}</h3>
        <p className="mt-1 text-xs font-sans text-warmwhite/60 leading-relaxed">{desc}</p>
      </div>

      <div className="absolute left-0 top-0 h-full w-[2px] bg-champagne scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
    </motion.div>
  );
}

export default function MaterialsShowcase() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="materials"
      className="relative bg-obsidian pt-16 pb-24 md:pt-20 md:pb-32 px-6 md:px-12 lg:px-20"
    >
      {/* Connector rule */}
      <div className="border-t border-champagne/20 mb-12 md:mb-16" />

      {/* Heading */}
      <motion.div
        variants={fadeUp}
        custom={0}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mb-12 md:mb-16"
      >
        <p className="font-sans text-[10px] uppercase tracking-widest2 text-champagne mb-4">
          — Browse the full range —
        </p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-warmwhite leading-tight max-w-lg">
          Our Materials
        </h2>
      </motion.div>

      {/* Tabs */}
      <motion.div
        variants={fadeUp}
        custom={1}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="flex gap-8 mb-12 border-b border-smoke"
      >
        {TABS.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`relative pb-4 font-sans text-sm uppercase tracking-widest2 transition-colors duration-300 ${
              active === i ? 'text-champagne' : 'text-warmwhite/40 hover:text-warmwhite/70'
            }`}
          >
            {tab.label}
            {active === i && (
              <motion.span
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-px bg-champagne"
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <div
          key={active}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:snap-none sm:mx-0 sm:px-0 lg:grid-cols-3"
        >
          {TABS[active].data.map((item, i) => (
            <MaterialCard key={item.name} {...item} index={i} />
          ))}
        </div>
      </AnimatePresence>
    </section>
  );
}
