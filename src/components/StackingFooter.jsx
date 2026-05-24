import Wordmark from './Wordmark.jsx';
import MagneticButton from './MagneticButton.jsx';
import { useBooking } from '../context/BookingContext.jsx';
import { whatsappLink, WHATSAPP_DISPLAY, PHONE_NUMBER, PHONE_NUMBER_2, ADDRESS_LINE1, ADDRESS_LINE2 } from '../lib/contact.js';

const FOOTER_IMAGE =
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=2400&q=80';

export default function StackingFooter() {
  const { openBooking } = useBooking();

  return (
    <footer
      id="contact"
      className="relative w-full overflow-hidden bg-obsidian text-warmwhite"
    >
      {/* Backdrop image */}
      <div className="absolute inset-0">
        <img
          src={FOOTER_IMAGE}
          alt=""
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/90 via-void/85 to-void" />
      </div>

      {/* Champagne glow accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse at 70% 30%, var(--c-glow-md) 0%, var(--c-bg0) 60%)',
        }}
      />

      <div className="relative z-10 flex flex-col gap-12 px-6 py-16 sm:gap-16 sm:px-10 sm:py-20 md:px-16 md:py-24">
        {/* Top label */}
        <p className="font-serif italic text-champagne text-xs sm:text-sm">
          — Studio &amp; Contact —
        </p>

        {/* Headline */}
        <div className="max-w-6xl">
          <h2 className="font-serif text-[13vw] leading-[0.95] tracking-tight sm:text-[11vw] md:text-[7.5vw]">
            Drape your home
            <br />
            <span>in </span>
            <span className="italic font-light text-champagne">Elegant.</span>
          </h2>
        </div>

        {/* Lower grid */}
        <div className="grid gap-8 border-t border-champagne/20 pt-8 text-sm font-light sm:gap-10 sm:pt-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-widest2 text-champagne/80">
              Store
            </p>
            <p className="text-warmwhite/90">{ADDRESS_LINE1}</p>
            <p className="text-warmwhite/90">{ADDRESS_LINE2}</p>
          </div>
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-widest2 text-champagne/80">
              Direct
            </p>
            <a
              href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
              className="block text-warmwhite/90 hover:text-champagne transition-colors"
            >
              {PHONE_NUMBER} <span className="text-champagne/70">· Call</span>
            </a>
            <a
              href={`tel:${PHONE_NUMBER_2.replace(/\s/g, '')}`}
              className="block text-warmwhite/90 hover:text-champagne transition-colors"
            >
              {PHONE_NUMBER_2} <span className="text-champagne/70">· Call</span>
            </a>
            <a
              href={whatsappLink('Hello — I would like to enquire about Elegant Curtains and Blinds.')}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-warmwhite/90 hover:text-champagne transition-colors"
            >
              {WHATSAPP_DISPLAY} <span className="text-champagne/70">· WhatsApp</span>
            </a>
          </div>
          <div className="flex flex-col items-start gap-4">
            <p className="text-[11px] uppercase tracking-widest2 text-champagne/80">
              Begin a project
            </p>
            <MagneticButton>
              <button
                onClick={openBooking}
                className="border border-champagne px-5 py-3 text-[11px] uppercase tracking-widest2 text-champagne transition-colors hover:bg-champagne hover:text-obsidian sm:px-6"
              >
                Book a Consultation
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Signature row */}
        <div className="flex flex-wrap items-center gap-3 border-t border-champagne/15 pt-6 text-[10px] uppercase tracking-widest2 text-warmwhite/60">
          <span>© 2026</span>
          <Wordmark
            size="sm"
            className="text-warmwhite/80 normal-case tracking-normal text-base"
          />
        </div>
      </div>
    </footer>
  );
}
