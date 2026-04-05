import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const teamMembers = [
  {
    name: 'Ruwan Wijesinghe',
    title: 'General Manager',
    bio: 'Over two decades of luxury hospitality experience across Asia and the Middle East.',
    image: '/images/western shoot 1.jpg'
  },
  {
    name: 'Amaya Silva',
    title: 'Executive Chef',
    bio: 'Pioneering modern Sri Lankan cuisine, elevating local indigenous ingredients.',
    image: '/images/kandiyan 1.jpg'
  },
  {
    name: 'Nithya Fernando',
    title: 'Spa Director',
    bio: 'Master of Ayurvedic therapies and holistic wellness practices from ancient traditions.',
    image: '/images/western shoot 2.jpg'
  }
];

export const Team = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-15%" });

  return (
    <section 
      ref={containerRef}
      className="bg-void py-24 lg:py-[120px] px-8 lg:px-[80px]"
    >
      <div className="max-w-[1200px] mx-auto w-full">
        <h2 className="font-cormorant text-[clamp(32px,4vw,48px)] text-center text-ivory font-light mb-20 lg:mb-[120px]">
          The Faces of A'Lankaa
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: 'easeOut' }}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="mb-8 border-b border-transparent pb-8 transition-colors duration-700 group-hover:border-gold/20 flex flex-col items-center">
                <div className="w-[180px] h-[180px] rounded-full p-2 border-[1px] border-gold/15 mb-8 overflow-hidden relative transition-colors duration-700 group-hover:border-gold/30">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110"
                    />
                  </div>
                </div>
                
                <h3 className="font-dmSans font-light tracking-wide text-[18px] text-cream mb-2">
                  {member.name}
                </h3>
                <p className="font-jost text-[10px] text-gold tracking-[0.2em] opacity-90 uppercase mb-5">
                  {member.title}
                </p>
                <p className="font-dmSans font-light text-[14px] text-smoke/90 max-w-[280px] leading-[1.8] line-clamp-2">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
