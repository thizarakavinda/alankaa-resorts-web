import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const milestones = [
  {
    year: '2018',
    title: 'The Vision',
    text: "First sketch of A'Lankaa drawn on the rocky summit of Haldummulla"
  },
  {
    year: '2020',
    title: 'Breaking Ground',
    text: "Construction begins on what will become Sri Lanka's most dramatic mountain resort"
  },
  {
    year: '2021',
    title: 'The First Stones',
    text: "Foundation completed on ancient bedrock at exactly 1,000m above sea level"
  },
  {
    year: '2022',
    title: 'Opening Day',
    text: "A'Lankaa Resorts & Spa welcomes its first guests to 20 luxury rooms"
  },
  {
    year: '2024',
    title: 'Recognition',
    text: "Named one of Sri Lanka's finest boutique resorts by leading travel publications"
  }
];

export const Timeline = () => {
  return (
    <section className="bg-obsidian py-24 lg:py-[120px] px-8 lg:px-[80px] overflow-hidden">
      <div className="max-w-[1000px] mx-auto w-full">
        <h2 className="font-cormorant text-[clamp(32px,4vw,48px)] text-center text-ivory font-light mb-20 lg:mb-[120px]">
          Milestones
        </h2>

        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gold/80 -translate-x-1/2 rounded-full" />

          {/* Nodes */}
          <div className="space-y-16 lg:space-y-24">
            {milestones.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return <TimelineNode key={item.year} item={item} isEven={isEven} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineNode = ({ item, isEven }: { item: typeof milestones[0], isEven: boolean }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-15%" });

  return (
    <div ref={nodeRef} className="relative flex items-center w-full min-h-[100px]">
      
      {/* Node Dot */}
      <div className="absolute left-[20px] md:left-1/2 top-8 md:top-1/2 w-[12px] h-[12px] bg-gold rounded-full -translate-x-1/2 md:-translate-y-1/2 shadow-[0_0_10px_rgba(184,150,90,0.5)] z-10" />

      {/* Content Container (Mobile: shifts right, Desktop: alternates) */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full relative pl-[60px] md:pl-0 flex flex-col md:w-1/2 ${
          isEven
            ? 'md:pr-[80px] md:text-right md:items-end self-start'
            : 'md:pl-[80px] md:translate-x-full md:text-left md:items-start self-start'
        }`}
      >
        <div className="font-cormorant text-[48px] text-gold/40 leading-none mb-4 -mt-2 md:mt-0">
          {item.year}
        </div>
        <h4 className="font-dmSans font-medium text-[16px] text-cream mb-2">
          {item.title}
        </h4>
        <p className="font-dmSans font-light text-[14px] text-smoke leading-relaxed max-w-[320px]">
          {item.text}
        </p>
      </motion.div>
    </div>
  );
};

// Trigger TS update
