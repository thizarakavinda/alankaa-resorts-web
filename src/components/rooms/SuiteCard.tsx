import { motion } from 'framer-motion';
import { Check, BedDouble, Users, Eye, LayoutGrid } from 'lucide-react';
import { calculateTotal } from '../../data/roomsData';

interface SuiteSpec {
  size: string;
  bed: string;
  guests: string;
  view: string;
}

interface Suite {
  id: number;
  number: string;
  category: string;
  badge: string | null;
  tag: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  size: string;
  view: string;
  available: number;
  basePrice: number;
  image: string;
  features: string[];
  specs: SuiteSpec;
}

interface SuiteCardProps {
  suite: Suite;
}

const SuiteCard = ({ suite }: SuiteCardProps) => {
  const isImageLeft = suite.id % 2 !== 0;

  return (
    <motion.div
      key={suite.id}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="border-b border-[rgba(184,150,90,0.08)]"
    >
      <div className={`flex flex-col lg:flex-row min-h-[680px]`}>

        {/* IMAGE SIDE */}
        <div
          className={`w-full lg:w-[55%] relative overflow-hidden h-[400px] lg:h-auto ${!isImageLeft ? 'lg:order-2' : ''}`}
          data-aos={isImageLeft ? 'fade-left' : 'fade-right'}
          data-aos-duration="800"
          data-aos-once="true"
        >
          <div className="suite-image-reveal w-full h-full relative overflow-hidden group">
            <img
              src={suite.image}
              alt={suite.name}
              className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-[8000ms] ease-out"
            />
          </div>

          {suite.badge && (
            <div className="absolute top-[24px] left-[24px] bg-[var(--clr-gold)] text-[var(--clr-void)] font-['Jost'] text-[9px] uppercase px-[16px] py-[6px] tracking-[0.2em]">
              {suite.badge}
            </div>
          )}

          <div className="absolute bottom-[24px] right-[24px] font-['Cormorant'] font-light text-[120px] text-white opacity-[0.06] leading-none select-none">
            {suite.number}
          </div>
        </div>

        {/* CONTENT SIDE */}
        <div
          className={`w-full lg:w-[45%] bg-[var(--clr-void)] p-[32px_24px] lg:p-[80px_72px] flex flex-col justify-center relative ${!isImageLeft ? 'lg:order-1' : ''}`}
          data-aos={isImageLeft ? 'fade-right' : 'fade-left'}
          data-aos-duration="800"
          data-aos-once="true"
        >
          <div className="absolute top-[40px] right-[32px] font-['Cormorant'] text-[200px] text-[rgba(184,150,90,0.04)] pointer-events-none leading-none select-none">
            {suite.number}
          </div>

          <div className="relative z-10">
            <div className="inline-block border-b border-[rgba(184,150,90,0.4)] pb-[8px] mb-[20px]">
              <p className="font-['Jost'] text-[9px] text-[var(--clr-gold)] uppercase tracking-[0.35em]">
                {suite.category}
              </p>
            </div>

            <h2 className="font-['Cormorant'] text-[clamp(32px,3.5vw,52px)] text-[var(--clr-ivory)] font-light leading-[1.1]">
              {suite.name}
            </h2>

            <div className="gold-line-anim w-[48px] h-[1px] bg-[var(--clr-gold)] mt-[24px] mb-[24px]"></div>

            <p className="font-['Cormorant'] italic text-[20px] text-[var(--clr-smoke)] mb-[16px]">
              {suite.tagline}
            </p>

            <p className="font-['DM_Sans'] font-light text-[14px] text-[var(--clr-smoke)] leading-[1.9] mb-[28px]">
              {suite.description}
            </p>

            {/* SPECS ROW */}
            <div className="flex flex-wrap gap-[24px] lg:gap-[32px] mb-[28px] items-center">
              <div className="flex flex-col gap-[4px]">
                <LayoutGrid size={18} color="var(--clr-gold)" />
                <p className="font-['DM_Sans'] font-medium text-[12px] text-[var(--clr-cream)]">{suite.specs.size}</p>
                <p className="font-['DM_Sans'] font-light text-[11px] text-[var(--clr-fog)]">Floor Area</p>
              </div>
              <div className="flex flex-col gap-[4px]">
                <BedDouble size={18} color="var(--clr-gold)" />
                <p className="font-['DM_Sans'] font-medium text-[12px] text-[var(--clr-cream)]">{suite.specs.bed}</p>
                <p className="font-['DM_Sans'] font-light text-[11px] text-[var(--clr-fog)]">Bed Type</p>
              </div>
              <div className="flex flex-col gap-[4px]">
                <Users size={18} color="var(--clr-gold)" />
                <p className="font-['DM_Sans'] font-medium text-[12px] text-[var(--clr-cream)]">{suite.specs.guests}</p>
                <p className="font-['DM_Sans'] font-light text-[11px] text-[var(--clr-fog)]">Capacity</p>
              </div>
              <div className="flex flex-col gap-[4px]">
                <Eye size={18} color="var(--clr-gold)" />
                <p className="font-['DM_Sans'] font-medium text-[12px] text-[var(--clr-cream)]">{suite.specs.view}</p>
                <p className="font-['DM_Sans'] font-light text-[11px] text-[var(--clr-fog)]">View</p>
              </div>

              <div className="flex items-center gap-1 font-['Jost'] text-[10px] text-[var(--clr-fog)] lg:ml-auto">
                <span className="text-[#4CAF50] animate-pulse">●</span> {suite.available} Suites Available
              </div>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[8px_24px] mb-[32px]">
              {suite.features.map((feature, i) => (
                <div key={i} className="flex flex-row gap-[8px] items-center">
                  <Check size={14} color="var(--clr-gold)" className="flex-shrink-0" />
                  <p className="font-['DM_Sans'] font-light text-[13px] text-[var(--clr-smoke)]">{feature}</p>
                </div>
              ))}
            </div>

            {/* PRICE BLOCK */}
            <div className="bg-[rgba(184,150,90,0.04)] border border-[rgba(184,150,90,0.12)] border-l-[2px] border-l-[var(--clr-gold)] p-[24px_28px] rounded-[2px] mb-[28px] group cursor-default relative">
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-start gap-4">

                {/* LEFT */}
                <div>
                  <p className="font-['Jost'] text-[9px] text-[var(--clr-fog)] uppercase">From</p>
                  <div className="flex items-baseline gap-[8px]">
                    <span className="font-['DM_Sans'] text-[18px] text-[var(--clr-gold)]">US$</span>
                    <span className="font-['Cormorant'] text-[64px] text-[var(--clr-gold)] font-light leading-none">{suite.basePrice}</span>
                    <span className="font-['DM_Sans'] text-[13px] text-[var(--clr-fog)]">/night</span>
                  </div>
                  <p className="font-['DM_Sans'] text-[11px] text-[var(--clr-fog)] mt-[4px]">
                    + 23% tax · + 10% service charge
                  </p>
                </div>

                {/* RIGHT */}
                <div
                  className="bg-[rgba(184,150,90,0.08)] p-[12px_16px] rounded-[2px] w-full xl:w-auto relative"
                  onMouseEnter={(e) => {
                    const details = e.currentTarget.querySelector('.price-breakdown');
                    if (details) (details as HTMLElement).style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    const details = e.currentTarget.querySelector('.price-breakdown');
                    if (details) (details as HTMLElement).style.opacity = '0';
                  }}
                >
                  <p className="font-['Jost'] text-[8px] text-[var(--clr-fog)] uppercase">Total per night</p>
                  <p className="font-['DM_Sans'] font-medium text-[18px] text-[var(--clr-cream)]">
                    US${calculateTotal(suite.basePrice).total}
                  </p>

                  {/* Hover Reveal Details */}
                  <div className="price-breakdown absolute top-full right-0 bg-[var(--clr-obsidian)] border border-[rgba(184,150,90,0.12)] p-3 mt-1 z-20 w-max opacity-0 transition-opacity duration-300 pointer-events-none shadow-xl">
                    <p className="font-['DM_Sans'] text-[11px] text-[var(--clr-fog)] leading-[1.8]">Base: US${suite.basePrice}</p>
                    <p className="font-['DM_Sans'] text-[11px] text-[var(--clr-fog)] leading-[1.8]">Tax (23%): US${calculateTotal(suite.basePrice).tax}</p>
                    <p className="font-['DM_Sans'] text-[11px] text-[var(--clr-fog)] leading-[1.8]">Service (10%): US${calculateTotal(suite.basePrice).service}</p>
                  </div>
                </div>
              </div>

              <div className="mt-[16px] flex flex-col gap-[6px]">
                <p className="font-['DM_Sans'] text-[12px] text-[var(--clr-smoke)] flex items-center">
                  <span className="text-[var(--clr-gold)] mr-2">✓</span> Complimentary Breakfast included
                </p>
                <p className="font-['DM_Sans'] text-[12px] text-[var(--clr-smoke)] flex items-center">
                  <span className="text-[var(--clr-gold)] mr-2">✓</span> Complimentary Lunch or Dinner included
                </p>
              </div>
            </div>

            {/* BUTTON ROW */}
            <div className="flex flex-col sm:flex-row gap-[16px]">
              <a href={`/booking?suite=${suite.id}`} className="inline-block bg-[var(--clr-gold)] text-[var(--clr-void)] font-['Jost'] text-[12px] uppercase tracking-[0.15em] px-[36px] py-[16px] text-center hover:bg-[var(--clr-gold-light)] hover:scale-[1.02] transition-all duration-300">
                Book This Suite &rarr;
              </a>
              <a href="/contact" className="inline-block bg-transparent border border-[rgba(184,150,90,0.4)] text-[var(--clr-gold)] font-['Jost'] text-[12px] uppercase px-[28px] py-[16px] text-center hover:border-[var(--clr-gold)] transition-colors duration-300">
                Enquire &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SuiteCard;