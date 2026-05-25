import { motion } from 'framer-motion';
import { useState } from 'react';
import ImageLightbox from './ImageLightbox.jsx';
import { useBooking } from '../context/BookingContext.jsx';

const PRODUCTS = [
  {
    name: 'Sheer Curtain',
    category: 'Curtains',
    projectType: 'Curtains',
    image: '/products/sheer-curtain.png',
    desc: 'Lightweight curtains that soften daylight while keeping the room open.',
    bestFor: 'Living rooms, balconies and spaces that need daylight with privacy',
    benefits: ['Soft light', 'Privacy', 'Airy finish'],
    materials: ['Curtain materials: Sheer Fabric'],
    notesSeed: 'I am interested in sheer curtains for soft daylight and privacy.',
  },
  {
    name: 'Blackout Curtain',
    category: 'Curtains',
    projectType: 'Curtains',
    image: '/products/blackout-curtain.png',
    desc: 'Dense curtains for stronger light control, better sleep and cooler rooms.',
    bestFor: 'Bedrooms, media rooms and heat-facing windows',
    benefits: ['Sleep comfort', 'Glare control', 'Cooler rooms'],
    materials: ['Curtain materials: Blackout Fabric'],
    notesSeed: 'I am interested in blackout curtains for stronger light control.',
  },
  {
    name: 'Pleated Curtain',
    category: 'Curtains',
    projectType: 'Curtains',
    image: '/products/pleated-curtain.png',
    desc: 'Structured folds that create a clean, tailored finish across the window.',
    bestFor: 'Formal halls, apartments and clean modern interiors',
    benefits: ['Tailored look', 'Reliable fall', 'Neat stacking'],
    materials: [],
    notesSeed: 'I am interested in pleated curtains with a neat tailored finish.',
  },
  {
    name: 'Eyelet Curtain',
    category: 'Curtains',
    projectType: 'Curtains',
    image: '/products/eyelet-curtain.png',
    desc: 'Curtains with clean metal eyelets that slide smoothly on a visible rod.',
    bestFor: 'Bedrooms, rentals and casual rooms that need simple day-to-day use',
    benefits: ['Easy sliding', 'Modern header', 'Quick styling'],
    materials: [],
    notesSeed: 'I am interested in eyelet curtains for a simple modern finish.',
  },
  {
    name: 'Layered Curtain',
    category: 'Curtains',
    projectType: 'Curtains',
    image: '/products/layered-curtain.png',
    imageFit: 'contain',
    desc: 'Sheer and blackout layers combined for privacy, daylight and night use.',
    bestFor: 'Rooms that need soft daylight by day and privacy at night',
    benefits: ['Day-night use', 'Flexible privacy', 'Premium depth'],
    materials: ['Curtain materials: Sheer Fabric', 'Curtain materials: Blackout Fabric'],
    notesSeed: 'I am interested in layered curtains with sheer and blackout options.',
  },
  {
    name: 'Double Layered Pleated Curtain',
    category: 'Curtains',
    projectType: 'Curtains',
    image: '/products/pleated-curtain-double-layered.png',
    desc: 'A layered pleated curtain setup for depth, privacy and controlled daylight.',
    bestFor: 'Living rooms and bedrooms that need a richer layered curtain look',
    benefits: ['Layered depth', 'Soft privacy', 'Tailored folds'],
    materials: ['Curtain materials: Sheer Fabric', 'Curtain materials: Blackout Fabric'],
    notesSeed: 'I am interested in double layered pleated curtains.',
  },
  {
    name: 'Motorized Curtain',
    category: 'Curtains',
    projectType: 'Curtains',
    image: '/products/motorized-curtain.png',
    desc: 'Remote-controlled curtains for large openings, tall windows and smart homes.',
    bestFor: 'Tall windows, villas, offices and smart homes',
    benefits: ['Remote control', 'Clean operation', 'Easy access'],
    materials: [],
    automation: 'Yes',
    notesSeed: 'I am interested in motorized curtains and would like guidance on controls.',
  },
  {
    name: 'Custom Curtains',
    category: 'Curtains',
    projectType: 'Curtains',
    image: '/products/curtains-bg.png',
    desc: 'Made-to-measure curtain solutions planned around the room and window size.',
    bestFor: 'Full-home curtain projects and rooms that need custom measurement',
    benefits: ['Made to measure', 'Room-led choice', 'Installed finish'],
    materials: [],
    notesSeed: 'I am interested in custom curtains for my space.',
  },
  {
    name: 'Roman Blind',
    category: 'Blinds',
    projectType: 'Blinds',
    image: '/products/roman-blind.png',
    desc: 'Fabric blinds that lift into soft folds for a warm, refined finish.',
    bestFor: 'Bedrooms, reading corners and windows with limited side space',
    benefits: ['Soft texture', 'Compact fit', 'Warm finish'],
    materials: [],
    notesSeed: 'I am interested in roman blinds with a soft fabric finish.',
  },
  {
    name: 'Roman Blind - Classic',
    category: 'Blinds',
    projectType: 'Blinds',
    image: '/products/roman-blind-2.jpg',
    desc: 'A compact roman blind style for smaller windows and tailored rooms.',
    bestFor: 'Compact bedrooms, study rooms and accent windows',
    benefits: ['Compact lift', 'Clean fold', 'Fabric warmth'],
    materials: [],
    notesSeed: 'I am interested in classic roman blinds for a compact window.',
  },
  {
    name: 'Roller Blind',
    category: 'Blinds',
    projectType: 'Blinds',
    image: '/products/roller-blind.png',
    desc: 'A minimal rolling blind for clean coverage and simple daily operation.',
    bestFor: 'Apartments, offices and rooms that need a clean compact blind',
    benefits: ['Minimal look', 'Easy operation', 'Compact roll'],
    materials: ['Blind materials: Solar Screen'],
    notesSeed: 'I am interested in roller blinds for a clean compact window finish.',
  },
  {
    name: 'Zebra Blind',
    category: 'Blinds',
    projectType: 'Blinds',
    image: '/products/zebra-blind.png',
    desc: 'Alternating sheer and opaque bands for flexible privacy and daylight.',
    bestFor: 'Living rooms, offices and windows that need quick light adjustment',
    benefits: ['Day-night control', 'Modern look', 'Flexible privacy'],
    materials: [],
    notesSeed: 'I am interested in zebra blinds for flexible daylight and privacy.',
  },
  {
    name: 'Venetian Blind - Wood Tone',
    category: 'Blinds',
    projectType: 'Blinds',
    image: '/products/venetian-blind-1.png',
    desc: 'Horizontal slats that tune privacy and sunlight throughout the day.',
    bestFor: 'Offices, kitchens and windows that need adjustable privacy',
    benefits: ['Light control', 'Easy cleaning', 'Sharp lines'],
    materials: ['Blind materials: Real Wood'],
    notesSeed: 'I am interested in venetian blinds for adjustable light control.',
  },
  {
    name: 'Venetian Blind - Slimline',
    category: 'Blinds',
    projectType: 'Blinds',
    image: '/products/venetian-blinds-2.png',
    desc: 'A crisp slatted blind option for practical privacy and glare control.',
    bestFor: 'Modern interiors, workspaces and bright windows',
    benefits: ['Precise tilt', 'Low upkeep', 'Modern finish'],
    materials: ['Blind materials: Aluminium'],
    notesSeed: 'I am interested in slimline venetian blinds.',
  },
  {
    name: 'Vertical Blind - Wide Window',
    category: 'Blinds',
    projectType: 'Blinds',
    image: '/products/vertical-blind-1.png',
    desc: 'Vertical panels designed for broad windows and large glass spans.',
    bestFor: 'Sliding doors, office partitions and large glass spans',
    benefits: ['Wide coverage', 'Smooth stacking', 'Practical privacy'],
    materials: [],
    notesSeed: 'I am interested in vertical blinds for a wide window or glass opening.',
  },
  {
    name: 'Vertical Blind - Panel Track',
    category: 'Blinds',
    projectType: 'Blinds',
    image: '/products/vertical-blind-2.png',
    desc: 'A clean vertical blind look for full-height openings and commercial rooms.',
    bestFor: 'Full-height openings, offices and balcony doors',
    benefits: ['Tall coverage', 'Easy operation', 'Neat lines'],
    materials: [],
    notesSeed: 'I am interested in vertical blinds for a tall opening.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
  }),
};

function ProductCard({ product, index, onPreview, onAsk }) {
  const preserveFullImage = product.imageFit === 'contain';

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="group relative overflow-hidden bg-coal"
    >
      <div className="flex w-full flex-col text-left sm:flex-row">
        <button
          type="button"
          onClick={onPreview}
          className="relative aspect-[4/3] w-full shrink-0 overflow-hidden text-left sm:aspect-[3/4] sm:w-64 md:w-80"
          aria-label={`View ${product.name}`}
        >
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`h-full w-full ${
              preserveFullImage ? 'object-contain p-3 sm:p-4' : 'object-cover'
            }`}
            whileHover={{ scale: preserveFullImage ? 1.01 : 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="absolute bottom-3 right-3 border border-champagne/45 bg-void/65 px-3 py-1.5 text-[10px] uppercase tracking-widest2 text-champagne opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
            View
          </span>
        </button>

        <div className="flex flex-1 flex-col justify-center px-6 py-6 sm:px-8 sm:py-8">
          <p className="mb-2 text-[10px] uppercase tracking-widest2 text-warmwhite/35">
            {product.category}
          </p>
          <h3 className="font-serif text-xl leading-snug text-champagne sm:text-2xl md:text-3xl">
            {product.name}
          </h3>
          <p className="mt-2 max-w-xs text-xs font-sans leading-relaxed text-warmwhite/60 sm:text-sm">
            {product.desc}
          </p>
          <p className="mt-4 max-w-md text-xs font-light leading-relaxed text-warmwhite/75 sm:text-sm">
            <span className="font-serif italic text-champagne">Best for: </span>
            {product.bestFor}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.benefits.map((benefit) => (
              <span
                key={benefit}
                className="border border-champagne/25 px-3 py-1.5 text-[10px] uppercase tracking-widest text-warmwhite/65"
              >
                {benefit}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onAsk}
              className="bg-champagne px-4 py-2.5 text-[10px] uppercase tracking-widest2 text-obsidian transition-colors hover:bg-warmwhite active:translate-y-px"
            >
              Ask about this
            </button>
            <button
              type="button"
              onClick={onPreview}
              className="border border-champagne/45 px-4 py-2.5 text-[10px] uppercase tracking-widest2 text-champagne transition-colors hover:bg-champagne hover:text-obsidian active:translate-y-px"
            >
              View larger
            </button>
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-champagne transition-transform duration-500 group-hover:scale-y-100" />
    </motion.div>
  );
}

function GroupHeading({ label, summary, count, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="mb-8 grid gap-5 border-t border-champagne/25 pt-8 md:grid-cols-[0.55fr_1fr] md:items-end md:gap-12"
    >
      <div>
        <p className="mb-3 font-sans text-[10px] uppercase tracking-widest2 text-champagne">
          {String(count).padStart(2, '0')} options
        </p>
        <h3 className="font-serif text-4xl leading-tight text-warmwhite sm:text-5xl md:text-6xl">
          {label}
        </h3>
      </div>
      <p className="max-w-2xl text-sm font-light leading-relaxed text-warmwhite/65 sm:text-base">
        {summary}
      </p>
    </motion.div>
  );
}

function SwipeRow({ items, startIndex, onPreview, onAsk }) {
  return (
    <div className="flex flex-col divide-y divide-champagne/10">
      {items.map((product, i) => (
        <ProductCard
          key={product.name}
          product={product}
          index={startIndex + i}
          onPreview={() => onPreview(product)}
          onAsk={() => onAsk(product)}
        />
      ))}
    </div>
  );
}

function bookingContextFor(product) {
  return {
    productName: product.name,
    projectType: product.projectType,
    sourceCategory: product.category,
    sourceTitle: product.name,
    sourceImage: product.image,
    materials: product.materials,
    automation: product.automation || 'No',
    notesSeed: product.notesSeed,
  };
}

export default function OurCollections() {
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { openBooking } = useBooking();

  const curtains = PRODUCTS.filter((product) => product.category === 'Curtains');
  const blinds = PRODUCTS.filter((product) => product.category === 'Blinds');
  const galleryItems = PRODUCTS.map((product) => ({
    ...product,
    title: product.name,
    type: product.desc,
    bookingContext: bookingContextFor(product),
  }));

  const openPreview = (product) => {
    const index = galleryItems.findIndex((item) => item.name === product.name);
    setPreviewIndex(Math.max(0, index));
    setPreviewOpen(true);
  };

  const askAbout = (product) => {
    openBooking(bookingContextFor(product));
  };

  return (
    <>
      <section
        id="collections"
        className="relative bg-onyx px-6 py-24 md:px-12 md:py-32 lg:px-20"
      >
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16 md:mb-20"
        >
          <p className="mb-4 font-sans text-[10px] uppercase tracking-widest2 text-champagne">
            What We Offer
          </p>
          <h2 className="max-w-lg font-serif text-4xl leading-tight text-warmwhite md:text-5xl lg:text-6xl">
            Our Collections
          </h2>
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          <section id="curtains" aria-labelledby="curtains-heading">
            <GroupHeading
              label="Curtains"
              summary="Soft fabric treatments for privacy, daylight, insulation and room character. Choose this group when you want drape, texture, layered depth or a more furnished feeling."
              count={curtains.length}
              index={1}
            />
            <h4 id="curtains-heading" className="sr-only">Curtain collection</h4>
            <SwipeRow
              items={curtains}
              startIndex={2}
              onPreview={openPreview}
              onAsk={askAbout}
            />
          </section>

          <section id="blinds" aria-labelledby="blinds-heading">
            <GroupHeading
              label="Blinds"
              summary="Compact window systems for precise light control, easy operation and cleaner lines. Choose this group for offices, small windows, wide glass spans or low-maintenance rooms."
              count={blinds.length}
              index={curtains.length + 2}
            />
            <h4 id="blinds-heading" className="sr-only">Blind collection</h4>
            <SwipeRow
              items={blinds}
              startIndex={curtains.length + 3}
              onPreview={openPreview}
              onAsk={askAbout}
            />
          </section>
        </div>
      </section>

      <ImageLightbox
        open={previewOpen}
        items={galleryItems}
        index={previewIndex}
        onClose={() => setPreviewOpen(false)}
        onIndexChange={setPreviewIndex}
      />
    </>
  );
}
