import { motion } from 'framer-motion';

const ITEMS = [
  { label: 'Curtains & blinds', detail: 'Soft drapes, compact blinds and layered window treatments' },
  { label: 'Guided selection', detail: 'We help match privacy, daylight, fabric weight and finish' },
  { label: 'Custom measured', detail: 'Curtains, blinds and tracks sized for your room' },
  { label: 'Installed cleanly', detail: 'Professional fitting with hardware aligned on site' },
];

export default function TrustStrip() {
  return (
    <section className="relative border-y border-champagne/15 bg-void px-6 py-8 sm:px-10 md:px-16">
      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="border-l border-champagne/25 pl-4"
          >
            <p className="text-[10px] uppercase tracking-widest2 text-champagne">
              {item.label}
            </p>
            <p className="mt-2 max-w-xs text-sm font-light leading-relaxed text-warmwhite/70">
              {item.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
