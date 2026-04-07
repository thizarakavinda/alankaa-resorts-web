import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const suiteOptions = [
  { value: 230, label: 'Sunrise Suite $230' },
  { value: 160, label: 'Sunset Suite $160' },
  { value: 130, label: 'Garden Suite $130' },
];

const RoomsPricingCalculator = () => {
  const [selectedCalcSuite, setSelectedCalcSuite] = useState(230);
  const [nights, setNights] = useState(3);

  return (
    <section className="bg-[var(--clr-void)] px-[24px] py-[60px] lg:px-[80px] lg:py-[80px] border-t border-[rgba(184,150,90,0.08)]">
      <div className="text-center">
        <p className="font-['Jost'] text-[10px] text-[var(--clr-gold)] uppercase tracking-[0.4em] mb-2">PRICING CALCULATOR</p>
        <h2 className="font-['Cormorant'] text-[clamp(32px,4vw,52px)] text-[var(--clr-ivory)] font-light leading-tight">
          Know exactly what you'll pay.
        </h2>
        <p className="font-['DM_Sans'] text-[14px] text-[var(--clr-smoke)] mt-[12px]">
          All rates include 23% government tax and 10% service charge.
        </p>
      </div>

      <div className="bg-[var(--clr-obsidian)] border border-[rgba(184,150,90,0.12)] border-t-[2px] border-t-[var(--clr-gold)] p-[32px] lg:p-[48px] rounded-[2px] max-w-[680px] mx-auto mt-[48px]">

        <div className="flex flex-col gap-6">
          {/* ROW 1 — Suite selector */}
          <div>
            <p className="font-['Jost'] text-[10px] text-[var(--clr-gold)] uppercase mb-3">Select Suite Category</p>
            <div className="flex flex-wrap gap-2">
              {suiteOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedCalcSuite(opt.value)}
                  className={`font-['Jost'] text-[11px] uppercase tracking-wider px-[16px] py-[8px] border rounded-[2px] transition-colors duration-300 w-full sm:w-auto ${selectedCalcSuite === opt.value
                      ? 'bg-[var(--clr-gold)] border-[var(--clr-gold)] text-[var(--clr-void)]'
                      : 'bg-transparent border-[rgba(184,150,90,0.25)] text-[var(--clr-smoke)] hover:border-[var(--clr-gold)]'
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* ROW 2 — Nights selector */}
          <div>
            <p className="font-['Jost'] text-[10px] text-[var(--clr-gold)] uppercase mb-3">Number of Nights</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setNights(Math.max(1, nights - 1))}
                className="w-[40px] h-[40px] flex items-center justify-center border border-[rgba(184,150,90,0.4)] text-[var(--clr-gold)] hover:bg-[rgba(184,150,90,0.1)] transition-colors text-xl"
              >−</button>
              <div className="font-['DM_Sans'] text-[18px] text-[var(--clr-ivory)] w-[40px] text-center font-light">{nights}</div>
              <button
                onClick={() => setNights(Math.min(30, nights + 1))}
                className="w-[40px] h-[40px] flex items-center justify-center border border-[rgba(184,150,90,0.4)] text-[var(--clr-gold)] hover:bg-[rgba(184,150,90,0.1)] transition-colors text-xl"
              >+</button>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[var(--clr-mist)] my-[32px]"></div>

        {/* ROW 3 — Breakdown */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center py-[12px] border-b border-[rgba(255,255,255,0.04)]">
            <span className="font-['DM_Sans'] text-[14px] text-[var(--clr-ivory)]">Base Rate (per night)</span>
            <span className="font-['DM_Sans'] text-[14px] text-[var(--clr-ivory)]">US${selectedCalcSuite}</span>
          </div>
          <div className="flex justify-between items-center py-[12px] border-b border-[rgba(255,255,255,0.04)]">
            <span className="font-['DM_Sans'] text-[14px] text-[var(--clr-ivory)]">× {nights} Night{nights > 1 ? 's' : ''}</span>
            <AnimatePresence mode="wait">
              <motion.span key={selectedCalcSuite * nights} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="font-['DM_Sans'] text-[14px] text-[var(--clr-ivory)]">
                US${(selectedCalcSuite * nights).toFixed(2)}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="flex justify-between items-center py-[12px] border-b border-[rgba(255,255,255,0.04)]">
            <span className="font-['DM_Sans'] text-[14px] text-[var(--clr-smoke)]">Government Tax (23%)</span>
            <AnimatePresence mode="wait">
              <motion.span key={selectedCalcSuite * nights * 0.23} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="font-['DM_Sans'] text-[14px] text-[var(--clr-smoke)]">
                US${(selectedCalcSuite * nights * 0.23).toFixed(2)}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="flex justify-between items-center py-[12px] border-b border-[rgba(255,255,255,0.04)]">
            <span className="font-['DM_Sans'] text-[14px] text-[var(--clr-smoke)]">Service Charge (10%)</span>
            <AnimatePresence mode="wait">
              <motion.span key={selectedCalcSuite * nights * 0.1} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="font-['DM_Sans'] text-[14px] text-[var(--clr-smoke)]">
                US${(selectedCalcSuite * nights * 0.10).toFixed(2)}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* TOTAL ROW */}
        <div className="bg-[rgba(184,150,90,0.06)] p-[20px_24px] mx-[-24px] sm:mx-[-32px] lg:mx-[-48px] border-t border-[rgba(184,150,90,0.2)] mt-[4px]">
          <p className="font-['Jost'] text-[10px] text-[var(--clr-gold)] uppercase tracking-wider mb-2">
            TOTAL FOR {nights} NIGHT{nights > 1 ? 'S' : ''}
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedCalcSuite * nights * 1.33}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-['Cormorant'] text-[48px] text-[var(--clr-gold)] font-light leading-none"
            >
              US${Math.round(selectedCalcSuite * nights * 1.33).toFixed(2)}
            </motion.p>
          </AnimatePresence>
          <p className="font-['DM_Sans'] text-[11px] text-[var(--clr-fog)] mt-[4px]">
            Inclusive of all taxes and charges
          </p>
        </div>

        <button className="w-full bg-[var(--clr-gold)] text-[var(--clr-void)] font-['Jost'] text-[12px] uppercase py-[16px] tracking-[0.15em] hover:bg-[var(--clr-gold-light)] transition-colors mt-[24px]">
          Book This Suite &rarr;
        </button>
        <p className="font-['DM_Sans'] text-[12px] text-[var(--clr-fog)] text-center mt-[12px]">
          or call us: 070 797 5975
        </p>
      </div>
    </section>
  );
};

export default RoomsPricingCalculator;