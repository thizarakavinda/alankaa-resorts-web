import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mountain, Heart, Compass } from 'lucide-react';

const cards = [
  {
    icon: Mountain,
    title: 'The Place',
    text: 'Perched on solid volcanic rock at 1,200m, our location is our most precious amenity.'
  },
  {
    icon: Heart,
    title: 'The People',
    text: 'Our team of 24/7 professionals are trained to anticipate, not just respond.'
  },
  {
    icon: Compass,
    title: 'The Purpose',
    text: 'To create experiences so profound that guests leave different from how they arrived.'
  }
];

export const Philosophy = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center p-8 lg:p-[80px]"
      style={{ background: 'var(--grad-forest)' }}
    >
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-white/[0.02] hover:bg-white/[0.04] border border-gold/10 hover:border-gold/20 transition-all duration-700 p-12 lg:p-[64px_48px] rounded-[2px]"
              >
                <Icon className="w-8 h-8 text-gold mb-8 stroke-[1]" />
                <h3 className="font-cormorant font-light text-[32px] text-ivory mb-6">
                  {card.title}
                </h3>
                <p className="font-dmSans font-light text-[15px] text-smoke/90 leading-[2] tracking-wide">
                  {card.text}
                </p>
              </motion.div>
            );
          })}
          
        </div>
      </div>
    </section>
  );
};
