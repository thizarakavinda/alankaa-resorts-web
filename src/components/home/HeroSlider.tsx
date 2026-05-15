import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const slides = [
  { src: '/images/view 6.webp', alt: 'Mountain View' },
  { src: '/images/v1.webp', alt: 'Resort Overview' },
  { src: '/images/ext 3.webp', alt: 'Resort Exterior' },
  { src: '/images/ext 4.webp', alt: 'Kandyan Suite' },
  { src: '/images/pool new 1.webp', alt: 'Infinity Pool' },
];

const INTERVAL = 5500;
const FADE_DURATION = 1.8;

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrent(index);
    timerRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      INTERVAL
    );
  };

  useEffect(() => {
    timerRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      INTERVAL
    );
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION, ease: 'easeInOut' }}
        >
          <motion.img
            src={slides[current].src}
            alt={slides[current].alt}
            className="w-full h-full object-cover"
            style={{ opacity: 0.82 }}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1.0 }}
            transition={{
              duration: INTERVAL / 1000 + FADE_DURATION,
              ease: 'linear',
            }}
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* dot indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="flex items-center justify-center"
          >
            <motion.span
              className="block rounded-full"
              animate={{
                width: i === current ? 26 : 6,
                height: 6,
                background:
                  i === current
                    ? 'var(--clr-gold, #b8965a)'
                    : 'rgba(255,255,255,0.35)',
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ display: 'block' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
