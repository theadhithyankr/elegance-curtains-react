import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const VIDEO_SRC = '/E1-web.mp4';

export default function VideoShowcase() {
  const videoRef = useRef(null);
  const wrapRef = useRef(null);
  const hideTimer = useRef(null);
  const reduced = useReducedMotion();

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // Pause when fully scrolled out of view
  useEffect(() => {
    if (!videoRef.current) return;
    const v = videoRef.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !v.paused) v.pause();
      },
      { threshold: 0.15 }
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  // Fullscreen state + auto-rotate to landscape on supported devices
  useEffect(() => {
    const onChange = async () => {
      const isFull = !!document.fullscreenElement;
      setFullscreen(isFull);
      // Screen Orientation API — works on Android Chrome / Edge; desktop
      // and iOS Safari either no-op or throw, both fine to swallow.
      try {
        if (isFull) {
          await screen.orientation?.lock?.('landscape');
        } else {
          screen.orientation?.unlock?.();
        }
      } catch {
        /* unsupported — ignore */
      }
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  // Auto-hide controls while playing and idle
  const ping = () => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (playing && !hovering) setControlsVisible(false);
    }, 2200);
  };
  useEffect(() => {
    if (!playing) setControlsVisible(true);
    return () => hideTimer.current && clearTimeout(hideTimer.current);
  }, [playing]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setHasStarted(true);
    } else {
      v.pause();
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const onSeek = (e) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const point = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const ratio = Math.max(0, Math.min(1, (point - rect.left) / rect.width));
    v.currentTime = ratio * duration;
    setCurrent(v.currentTime);
  };

  const toggleFullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  return (
    <section className="relative bg-obsidian py-20 px-6 sm:py-24 sm:px-10 md:py-28 md:px-16">
      {/* Glow accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse at center, var(--c-glow-md) 0%, var(--c-bg0) 60%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-12">
          <div>
            <p className="mb-2 font-serif italic text-champagne text-sm sm:text-base">
              — Customer Testimonial —
            </p>
            <h2 className="font-serif text-[10vw] leading-[0.95] tracking-tight text-warmwhite sm:text-[7vw] md:text-[4.5vw]">
              Hear from our{' '}
              <span className="italic font-light text-champagne">clients.</span>
            </h2>
          </div>
        </div>

        <motion.div
          ref={wrapRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => {
            setHovering(true);
            ping();
          }}
          onMouseLeave={() => {
            setHovering(false);
            ping();
          }}
          onMouseMove={ping}
          onTouchStart={ping}
          className="group relative aspect-video w-full overflow-hidden bg-coal ring-1 ring-champagne/25"
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            playsInline
            muted={muted}
            preload="metadata"
            onClick={togglePlay}
            onPlay={() => {
              setPlaying(true);
              ping();
            }}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onEnded={() => setPlaying(false)}
            className="absolute inset-0 h-full w-full cursor-pointer object-cover"
          >
            <track
              kind="captions"
              src="/testimonial.vtt"
              srcLang="en"
              label="English captions"
              default
            />
          </video>

          {/* Big centered play button — only before first start */}
          <AnimatePresence>
            {!hasStarted && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={togglePlay}
                className="absolute inset-0 z-10 flex items-center justify-center bg-void/40 backdrop-blur-[2px]"
                aria-label="Play video"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-champagne/70 bg-void/40 text-champagne transition-colors group-hover:bg-champagne group-hover:text-obsidian sm:h-24 sm:w-24">
                  <PlayIcon className="h-7 w-7 translate-x-0.5" />
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Bottom control bar */}
          <AnimatePresence>
            {(controlsVisible || !playing) && hasStarted && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: reduced ? 0.1 : 0.25, ease: 'easeOut' }}
                className="absolute inset-x-0 bottom-0 z-10"
              >
                {/* Gradient base so controls remain legible over bright frames */}
                <div className="img-overlay pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void via-void/60 to-transparent" />

                <div className="relative px-4 pb-3 pt-8 sm:px-6 sm:pb-4 sm:pt-10">
                  {/* Seek bar */}
                  <SeekBar
                    current={current}
                    duration={duration}
                    onSeek={onSeek}
                  />

                  {/* Buttons row */}
                  <div className="mt-3 flex items-center justify-between text-warmwhite">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <CtrlButton onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
                        {playing ? <PauseIcon /> : <PlayIcon />}
                      </CtrlButton>
                      <CtrlButton onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
                        {muted ? <MuteIcon /> : <VolumeIcon />}
                      </CtrlButton>
                      <span className="font-serif italic text-champagne/90 text-xs tabular-nums sm:text-sm">
                        {fmt(current)} <span className="text-warmwhite/40">/ {fmt(duration)}</span>
                      </span>
                    </div>
                    <div className="hidden items-center gap-3 sm:flex">
                      <span className="text-[10px] uppercase tracking-widest2 text-champagne/70">
                        Elegant Curtains and Blinds · Testimonial
                      </span>
                      <CtrlButton onClick={toggleFullscreen} aria-label="Toggle fullscreen">
                        {fullscreen ? <ExitFullIcon /> : <EnterFullIcon />}
                      </CtrlButton>
                    </div>
                    <CtrlButton
                      onClick={toggleFullscreen}
                      aria-label="Toggle fullscreen"
                      className="sm:hidden"
                    >
                      {fullscreen ? <ExitFullIcon /> : <EnterFullIcon />}
                    </CtrlButton>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}

/* ----------- Sub components ----------- */

function SeekBar({ current, duration, onSeek }) {
  const [scrubbing, setScrubbing] = useState(false);
  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div
      onMouseDown={(e) => {
        setScrubbing(true);
        onSeek(e);
      }}
      onMouseMove={(e) => scrubbing && onSeek(e)}
      onMouseUp={() => setScrubbing(false)}
      onMouseLeave={() => setScrubbing(false)}
      onTouchStart={(e) => onSeek(e)}
      onTouchMove={(e) => onSeek(e)}
      className="group/seek relative h-5 w-full cursor-pointer"
    >
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-warmwhite/15 transition-all group-hover/seek:h-[3px]" />
      <div
        style={{ width: `${progress}%` }}
        className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-champagne transition-all group-hover/seek:h-[3px]"
      />
      <div
        style={{ left: `${progress}%` }}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/seek:opacity-100 transition-opacity"
      >
        <span className="block h-3 w-3 rounded-full bg-champagne shadow-[0_0_10px_rgb(var(--c-champagne)/0.6)]" />
      </div>
    </div>
  );
}

function CtrlButton({ children, className = '', ...rest }) {
  return (
    <button
      {...rest}
      className={`flex h-9 w-9 items-center justify-center text-warmwhite/90 transition-colors hover:text-champagne ${className}`}
    >
      {children}
    </button>
  );
}

function fmt(s) {
  if (!s || !isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

/* ----------- Icons (inline SVG, currentColor) ----------- */

function PlayIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 4l14 8-14 8V4z" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}
function VolumeIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}
function MuteIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <line x1="22" y1="9" x2="16" y2="15" />
      <line x1="16" y1="9" x2="22" y2="15" />
    </svg>
  );
}
function EnterFullIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </svg>
  );
}
function ExitFullIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
    </svg>
  );
}
