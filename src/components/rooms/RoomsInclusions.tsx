import { motion } from 'framer-motion';
import {
  Coffee, UtensilsCrossed, Waves,
  Wind, Droplets, Mountain,
  Home, Sparkles, Wifi
} from 'lucide-react';

const inclusions = [
  { icon: <Coffee size={28} />, title: "Complimentary Breakfast", desc: "Full breakfast included for all suite categories" },
  { icon: <Waves size={28} />, title: "Private Jacuzzi", desc: "Separate jacuzzi in Sunrise & Sunset suites" },
  { icon: <Wind size={28} />, title: "Air Conditioning", desc: "Individual AC unit and ceiling fan in every suite" },
  { icon: <Droplets size={28} />, title: "Hot Water", desc: "24-hour hot water supply in all suites" },
  { icon: <Mountain size={28} />, title: "Panoramic Views", desc: "Stunning mountain, valley or garden views from every suite" },
  { icon: <Home size={28} />, title: "Private Balcony", desc: "Private balcony in Sunrise & Sunset suites" },
  { icon: <Sparkles size={28} />, title: "Daily Housekeeping", desc: "Full daily housekeeping and turndown service" },
  { icon: <Wifi size={28} />, title: "Free WiFi", desc: "Complimentary high-speed WiFi throughout the resort" },
];

const RoomsInclusions = () => {
  return (
    <section className="bg-[var(--grad-forest)] px-[24px] py-[60px] lg:px-[80px] lg:py-[110px] text-center">
      <p className="font-['Jost'] text-[10px] text-[var(--clr-gold)] uppercase tracking-[0.4em]">INCLUSIONS</p>
      <h2 className="font-['Cormorant'] text-[clamp(40px,5vw,68px)] text-[var(--clr-ivory)] font-light mt-2">
        Every suite includes.
      </h2>
      <p className="font-['DM_Sans'] text-[15px] text-[var(--clr-smoke)] mt-[16px] max-w-2xl mx-auto">
        No hidden extras. No surprises.<br />
        Just pure luxury from the moment you arrive.
      </p>

      <div className="gold-line-anim w-full h-[1px] bg-[var(--clr-gold)] my-[60px] mx-auto opacity-50"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]">
        {inclusions.map((item, i) => (
          <motion.div
            key={i}
            data-aos="fade-up"
            data-aos-delay={i * 80}
            data-aos-once="true"
            whileHover={{
              borderColor: 'rgba(184,150,90,0.3)',
              backgroundColor: 'rgba(184,150,90,0.04)'
            }}
            className="bg-[rgba(255,255,255,0.03)] border border-[rgba(184,150,90,0.08)] p-[40px_32px] flex flex-col items-start transition-colors duration-300 group text-left"
          >
            <div className="text-[var(--clr-gold)] mb-[20px] transition-transform duration-300 group-hover:-translate-y-1">
              {item.icon}
            </div>
            <h3 className="font-['DM_Sans'] font-medium text-[15px] text-[var(--clr-cream)] mb-[8px]">{item.title}</h3>
            <p className="font-['DM_Sans'] font-light text-[13px] text-[var(--clr-smoke)]">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RoomsInclusions;