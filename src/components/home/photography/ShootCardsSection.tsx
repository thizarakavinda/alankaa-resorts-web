import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const shootCards = [
 
  {
    badge: "CULTURAL EXPERIENCE",
    category: "KANDYAN",
    name: "Kandyan Traditional",
    desc: "Celebrate Sri Lanka's rich cultural heritage draped in exquisite Kandyan attire against our breathtaking mountain vistas.",
    tags: "Heritage Gardens · Rock Formations",
    img: "/images/kandiyan 4.jpg"
  },
  {
    badge: "CONTEMPORARY",
    category: "WESTERN",
    name: "Western Style",
    desc: "Clean lines, modern fashion, and the world's most dramatic natural backdrop. Contemporary shoots with a soul.",
    tags: "Pool Deck · Mountain Overlook · Interiors",
    img: "/images/western shoot 2.jpg"
  },
   {
    badge: "MOST POPULAR",
    category: "WEDDING",
    name: "Wedding Shoots",
    desc: "Say 'I do' with the misty mountains as your witness. Intimate, dramatic, and timelessly beautiful.",
    tags: "Infinity Pool · Sunrise Point · Gardens",
    img: "/images/kandiyan 5.jpg"
  },
  {
    badge: "FOR EVERYONE",
    category: "LIFESTYLE",
    name: "Lifestyle Sessions",
    desc: "Candid, joyful, and real. Whether family portraits or solo travel content — our landscape elevates every frame.",
    tags: "Pool · Nature Trails · Sunrise Point",
    img: "/images/western 6.jpg"
  }
];

const ShootCardsSection = () => {
  return (
    <section className="bg-void py-[120px] pl-6 md:pl-[80px] overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 pr-6 md:pr-[80px] relative z-10 w-full">
        <div className="max-w-[480px]">
          <span className="font-jost text-[10px] text-gold uppercase tracking-[0.4em] block mb-4" data-aos="fade-right">What We Offer</span>
          <h2 className="font-cormorant text-[clamp(40px,5vw,72px)] text-ivory font-light leading-none mb-6" data-aos="fade-up">
            Every shoot, a masterpiece.
          </h2>
          <p className="font-dmSans text-[15px] text-smoke leading-relaxed mb-8" data-aos="fade-up" data-aos-delay="100">
            From intimate wedding portraits to cultural celebrations and casual lifestyle sessions — A'Lankaa's dramatic landscape transforms every photograph into art.
          </p>
          <button className="border border-gold/50 text-gold font-jost text-[11px] uppercase tracking-widest px-8 py-4 hover:bg-gold hover:text-void transition-colors duration-300" data-aos="fade-up" data-aos-delay="200">
            Enquire About a Shoot
          </button>
        </div>

        <div className="hidden lg:flex gap-6 xl:gap-8 items-center mr-6 xl:mr-16 pointer-events-none absolute right-0 top-0">
          <motion.div animate={{ y: [0, -18, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="mb-[30px] hidden xl:block">
             <img src="/images/kandiyan 5.jpg" alt="Shoot" className="w-[150px] h-[200px] object-cover opacity-70" />
          </motion.div>
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="mt-[40px]">
             <img src="/images/kandiyan 4.jpg" alt="Shoot" className="w-[180px] h-[240px] object-cover opacity-70" />
          </motion.div>
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="mb-[60px]">
             <img src="/images/western shoot 2.jpg" alt="Shoot" className="w-[140px] h-[190px] object-cover opacity-70" />
          </motion.div>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory cursor-grab active:cursor-grabbing w-full scrollbar-none" style={{ scrollbarWidth: 'none' }}>
        {shootCards.map((card, i) => (
          <motion.div 
            key={i} 
            className="w-[85vw] md:w-[400px] shrink-0 h-[560px] rounded-[2px] overflow-hidden relative group snap-center md:snap-start"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="absolute inset-0 bg-obsidian z-0">
               <img src={card.img} alt={card.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60 mix-blend-luminosity hover:mix-blend-normal" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none" />
            
            <div className="absolute top-6 left-6 font-jost text-[9px] text-void bg-gold px-[14px] py-[6px] tracking-[0.15em] uppercase z-10 shadow-lg">
              {card.badge}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
              <span className="gold-label-on-image font-jost text-[9px] text-gold uppercase tracking-widest block mb-1">{card.category}</span>
              <h3 className="card-heading-on-image font-cormorant text-[38px] text-ivory leading-none mb-3">{card.name}</h3>
              <p className="card-text-on-image font-dmSans text-[13px] text-smoke font-light leading-relaxed mb-4">{card.desc}</p>
              
              <div className="w-[40px] h-[1px] bg-gold mb-4 opacity-50" />
              <p className="card-text-on-image font-jost text-[10px] text-fog uppercase">{card.tags}</p>

              <div className="overflow-hidden mt-6 flex h-0 group-hover:h-[45px] transition-all duration-300">
                <button className="w-full bg-gold text-void font-jost text-[11px] uppercase tracking-widest py-3 flex items-center justify-center gap-2 hover:bg-ivory transition-colors">
                  Enquire Now <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        
        <div className="w-[40px] shrink-0 pointer-events-none" />
      </div>

      <div className="flex justify-center mt-8">
        <span className="font-jost text-[9px] text-fog tracking-[0.3em] uppercase animate-pulse">
          ← Drag to Explore →
        </span>
      </div>
    </section>
  );
};

export default ShootCardsSection;
