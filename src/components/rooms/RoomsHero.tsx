import { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect } from 'react';

const RoomsHero = () => {
  const heroImageRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (heroImageRef.current) {
      gsap.fromTo(heroImageRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.4, ease: 'power4.inOut' }
      );
    }
  }, []);

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Layer 1 — Image */}
      <div className="absolute inset-0 z-0">
        <img
          ref={heroImageRef}
          src="/images/room hero.png"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Layer 2 — Overlay */}
      <div className="absolute inset-0 z-10" style={{
        background: 'linear-gradient(180deg, rgba(8,8,8,0.2) 0%, rgba(8,8,8,0.4) 50%, rgba(8,8,8,0.92) 100%)'
      }}></div>

      {/* TOP RIGHT corner */}
      <div className="absolute top-[40px] right-[80px] z-20">
        <p className="font-['Jost'] text-[11px] text-[var(--clr-fog)]">
          Home / Rooms & Suites
        </p>
      </div>

      {/* Layer 3 — Content */}
      <div className="absolute bottom-[80px] left-[80px] z-20">
        <p className="font-['Jost'] text-[10px] text-[var(--clr-gold)] uppercase tracking-[0.5em] mb-4 gold-label-on-image">
          WATTAGAMUWA · HALDUMMULLA · SRI LANKA
        </p>

        <h1 ref={headingRef} className="font-['Cormorant'] text-[clamp(56px,8vw,110px)] text-[var(--clr-ivory)] font-light leading-[0.9] hero-headline-on-image">
          Rooms & Suites
        </h1>

        <div className="mt-[20px] font-['DM_Sans'] text-[16px] text-[var(--clr-smoke)] hero-subtext-on-image">
          <p>Three categories of luxury suites.</p>
          <p>Each one, extraordinary.</p>
        </div>

        {/* Stats row */}
        <div className="flex gap-[48px] mt-[32px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <p className="font-['Cormorant'] text-[48px] text-[var(--clr-gold)] leading-none gold-label-on-image">22</p>
            <p className="font-['Jost'] text-[9px] text-[var(--clr-fog)] uppercase mt-1 hero-subtext-on-image">Total Suites</p>
          </motion.div>

          <div className="w-[1px] bg-[var(--clr-mist)] h-auto"></div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <p className="font-['Cormorant'] text-[48px] text-[var(--clr-gold)] leading-none gold-label-on-image">3</p>
            <p className="font-['Jost'] text-[9px] text-[var(--clr-fog)] uppercase mt-1 hero-subtext-on-image">Suite Categories</p>
          </motion.div>

          <div className="w-[1px] bg-[var(--clr-mist)] h-auto"></div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
            <p className="font-['Cormorant'] text-[48px] text-[var(--clr-gold)] leading-none gold-label-on-image">50–75</p>
            <p className="font-['Jost'] text-[9px] text-[var(--clr-fog)] uppercase mt-1 hero-subtext-on-image">Square Metres</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RoomsHero;