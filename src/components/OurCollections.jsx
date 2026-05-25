import { motion } from 'framer-motion';
import { useState } from 'react';
import ImageLightbox from './ImageLightbox.jsx';
import { useBooking } from '../context/BookingContext.jsx';

const CURTAINS = [
  {
    name: 'Sheer Curtain',
    img: '/products/sheer-curtain.png',
    desc: 'Diffuses light into a soft, ambient glow',
    bestFor: 'Living rooms, balconies and spaces that need daylight with privacy',
    benefits: ['Soft light', 'Privacy', 'Airy finish'],
  },
  {
    name: 'Blackout Curtain',
    img: '/products/blackout-curtain.png',
    desc: 'Complete light block for restful sleep',
    bestFor: 'Bedrooms, media rooms and heat-facing windows',
    benefits: ['Sleep comfort', 'Glare control', 'Cooler rooms'],
  },
  {
    name: 'Pleated Curtain',
    img: '/products/pleated-curtain.png',
    desc: 'Tailored folds for a structured silhouette',
    bestFor: 'Formal halls, apartments and clean modern interiors',
    benefits: ['Tailored look', 'Reliable fall', 'Neat stacking'],
  },
  {
    name: 'Layered Curtain',
    img: '/products/layered-curtain.png',
    desc: 'Sheer and blackout combined in one track',
    bestFor: 'Rooms that need soft daylight by day and privacy at night',
    benefits: ['Day-night use', 'Flexible privacy', 'Premium depth'],
  },
  {
    name: 'Motorized Curtain',
    img: '/products/motorized-curtain.png',
    desc: 'Smart automation at the touch of a button',
    bestFor: 'Tall windows, villas, offices and smart homes',
    benefits: ['Remote control', 'Clean operation', 'Easy access'],
  },
  {
    name: 'Roman Curtains',
    img: '/products/roman-blinds.png',
    desc: 'Soft fabric folds, timeless and versatile',
    bestFor: 'Compact windows, bedrooms and refined accent spaces',
    benefits: ['Soft folds', 'Space saving', 'Classic finish'],
  },
];

const BLINDS = [
  {
    name: 'Venetian Blinds',
    img: '/products/venetian-blind-1.png',
    desc: 'Precise light control through angled slats',
    bestFor: 'Offices, kitchens and windows that need adjustable privacy',
    benefits: ['Light control', 'Easy cleaning', 'Sharp lines'],
  },
  {
    name: 'Vertical Blinds',
    img: '/products/vertical-blind-1.png',
    desc: 'Floor-to-ceiling coverage for wide windows',
    bestFor: 'Sliding doors, office partitions and large glass spans',
    benefits: ['Wide coverage', 'Smooth stacking', 'Practical privacy'],
  },
  {
    name: 'Roman Blinds',
    img: '/products/roman-blinds.png',
    desc: 'Elegant stacked folds for a refined finish',
    bestFor: 'Bedrooms, reading corners and windows with limited side space',
    benefits: ['Soft texture', 'Compact fit', 'Warm finish'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

function ProductCard({ name, img, desc, bestFor, benefits, category, index, onPreview, onAsk }) {
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
        {/* Image */}
        <button
          type="button"
          onClick={onPreview}
          className="relative aspect-[4/3] w-full shrink-0 overflow-hidden text-left sm:aspect-[3/4] sm:w-64 md:w-80"
          aria-label={`View ${name}`}
        >
          {img ? (
            <motion.img
              src={img}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-smoke to-coal">
              <span className="font-serif text-4xl text-champagne/30 tracking-widest select-none" aria-hidden="true">
                {name.split(' ').map((w) => w[0]).join('')}
              </span>
              <span className="mt-4 text-[10px] uppercase tracking-widest text-warmwhite/25 font-sans">
                Image coming soon
              </span>
            </div>
          )}
          <span className="absolute bottom-3 right-3 border border-champagne/45 bg-void/65 px-3 py-1.5 text-[10px] uppercase tracking-widest2 text-champagne opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
            View
          </span>
        </button>

        {/* Info */}
        <div className="flex flex-1 flex-col justify-center px-6 py-6 sm:px-8 sm:py-8">
          <p className="mb-2 text-[10px] uppercase tracking-widest2 text-warmwhite/35">
            {category}
          </p>
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-champagne leading-snug">{name}</h3>
          <p className="mt-2 text-xs sm:text-sm font-sans text-warmwhite/60 leading-relaxed max-w-xs">{desc}</p>
          <p className="mt-4 max-w-md text-xs font-light leading-relaxed text-warmwhite/75 sm:text-sm">
            <span className="font-serif italic text-champagne">Best for: </span>
            {bestFor}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {benefits.map((benefit) => (
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

      <div className="absolute left-0 top-0 h-full w-[2px] bg-champagne scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
    </motion.div>
  );
}

function GroupHeading({ label, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="flex items-center gap-6 mb-4"
    >
      <span className="font-sans text-[10px] uppercase tracking-widest2 text-champagne">
        {label}
      </span>
      <div className="flex-1 h-px bg-champagne/25" />
    </motion.div>
  );
}

function SwipeRow({ items, category, startIndex, galleryOffset, onPreview, onAsk }) {
  return (
    <div className="flex flex-col divide-y divide-champagne/10">
      {items.map((item, i) => (
        <ProductCard
          key={item.name}
          {...item}
          category={category}
          index={startIndex + i}
          onPreview={() => onPreview(galleryOffset + i)}
          onAsk={() => onAsk(item, category)}
        />
      ))}
    </div>
  );
}

export default function OurCollections() {
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { openBooking } = useBooking();
  const galleryItems = [
    ...CURTAINS.map((item) => ({ ...item, title: item.name, image: item.img, category: 'Curtains' })),
    ...BLINDS.map((item) => ({ ...item, title: item.name, image: item.img, category: 'Blinds' })),
  ];

  const openPreview = (index) => {
    setPreviewIndex(index);
    setPreviewOpen(true);
  };

  const askAbout = (item, category) => {
    openBooking({
      projectType: category,
      sourceCategory: category,
      sourceTitle: item.name,
    });
  };

  return (
    <>
      <section
        id="collections"
        className="relative bg-onyx py-24 md:py-32 px-6 md:px-12 lg:px-20"
      >
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16 md:mb-20"
        >
          <p className="font-sans text-[10px] uppercase tracking-widest2 text-champagne mb-4">
            What We Offer
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-warmwhite leading-tight max-w-lg">
            Our Collections
          </h2>
        </motion.div>

        <div className="space-y-12 md:space-y-16">
          <div>
            <GroupHeading label="Curtains" index={1} />
            <SwipeRow
              items={CURTAINS}
              category="Curtains"
              startIndex={2}
              galleryOffset={0}
              onPreview={openPreview}
              onAsk={askAbout}
            />
          </div>

          <div>
            <GroupHeading label="Blinds" index={CURTAINS.length + 2} />
            <SwipeRow
              items={BLINDS}
              category="Blinds"
              startIndex={CURTAINS.length + 3}
              galleryOffset={CURTAINS.length}
              onPreview={openPreview}
              onAsk={askAbout}
            />
          </div>
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
