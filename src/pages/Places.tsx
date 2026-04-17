import { useEffect } from 'react';
import { motion } from 'framer-motion';

const attractions = [
  {
    badge: "36 KM AWAY",
    category: "ICONIC LANDMARK",
    title: "Nine Arch Bridge",
    location: "Ella, Badulla District",
    desc: "One of Sri Lanka's most photographed landmarks. A colonial-era stone railway viaduct surrounded by jungle and mist.",
    image: "/images/ninearch.png"
  },
  {
    badge: "46 KM AWAY",
    category: "NATIONAL PARK",
    title: "Horton Plains",
    location: "Nuwara Eliya District",
    desc: "A UNESCO World Heritage Site featuring dramatic cliffs, cloud forests, and Sri Lanka's highest plateau at 2,100m.",
    image: "/images/hort.png"
  },
  {
    badge: "NEARBY",
    category: "NATURAL WONDER",
    title: "Bambarakanda Falls",
    location: "Kalupahana, Badulla",
    desc: "Sri Lanka's tallest waterfall at 263 metres, surrounded by pine forests and mist — a short scenic drive from A'Lankaa.",
    image: "/images/bamba.png"
  },
  {
    badge: "40 KM AWAY",
    category: "HIKING & VIEWS",
    title: "Ella Rock",
    location: "Ella, Badulla",
    desc: "One of Sri Lanka's finest hikes — rewarding trekkers with 360° views of tea country, jungle valleys, and the ocean on clear days.",
    image: "/images/ella.png"
  },
  /*-------------------------------------------------------------------------------------------------*/
  {
    badge: "36.8 KM AWAY",
    category: "HIDDEN GEM",
    title: "Lipton's Seat",
    location: "Haputale, Badulla",
    desc: "A panoramic hilltop viewpoint where tea baron Sir Thomas Lipton once surveyed his empire. On clear mornings, the mist rolls across endless tea estates in every direction.",
    image: "/images/lipton seat.png"
  },
  {
    badge: "35.1 KM AWAY",
    category: "WATERFALL",
    title: "Diyaluma Waterfall",
    location: "Koslanda, Badulla",
    desc: "Sri Lanka's second tallest waterfall, plunging 220 metres into a rocky gorge. Natural infinity pools near the summit make it a reward worth every step of the climb.",
    image: "/images/diyaluma.png"
  },
  {
    badge: "30.8 KM AWAY",
    category: "COLONIAL HERITAGE",
    title: "Dambatenna Tea Factory",
    location: "Haputale, Badulla",
    desc: "A working tea factory founded by Sir Thomas Lipton in 1890. Step inside to witness the century-old art of transforming fresh leaves into Ceylon's finest brew.",
    image: "/images/dambatenna.png"
  },
  {
    badge: "25.3 KM AWAY",
    category: "ARCHITECTURAL TREASURE",
    title: "Adisham Bungalow",
    location: "Haputale, Badulla",
    desc: "A charming English-style manor built in 1931, now home to a Benedictine monastery. Its manicured gardens and stone façade feel like a corner of the English countryside dropped into the highlands.",
    image: "/images/adisham.png"
  },
  {
    badge: "64.9 KM AWAY",
    category: "NATURAL WONDER",
    title: "Dunhinda Waterfall",
    location: "Badulla",
    desc: "Bridal Veil of Sri Lanka, this powerful cascade tumbles 64 metres through dense jungle. The mist it creates nourishes a microworld of rare ferns and butterflies.",
    image: "/images/dunhinda.png"
  },
  {
    badge: "52.2 KM AWAY",
    category: "TRAIL LEGEND",
    title: "Devil's Staircase",
    location: "Ohiya, Nuwara Eliya",
    desc: "A gruelling section of the historic Colombo–Badulla railway trail carved into a near-vertical hillside. A punishing yet unforgettable route through misty cloud forest and raw mountain terrain.",
    image: "/images/devil.png"
  },
  {
    badge: "27.9 KM AWAY",
    category: "TIMELESS ESCAPE",
    title: "Idalgashinna",
    location: "Idalgashinna, Badulla",
    desc: "A quiet highland railway station lost in time, surrounded by rolling tea country and cool mountain air. Board the legendary Badulla train here for one of the most scenic rail journeys on the island.",
    image: "/images/idalgashinna.png"
  },
  {
    badge: "64.5 KM AWAY",
    category: "ANCIENT RELIC",
    title: "Bogoda Bridge",
    location: "Bogoda, Badulla",
    desc: "Sri Lanka's oldest surviving wooden bridge, believed to date back to the Kandyan Kingdom era. Sheltered by a traditional roof and set above a gentle stream, it stands as a quiet testament to a forgotten.",
    image: "/images/bogoda.png"
  },
  {
    badge: "35 KM AWAY",
    category: "LEGENDARY LANDMARK",
    title: "Ravana Waterfall",
    location: "Ella, Badulla",
    desc: "One of Sri Lanka's widest falls, steeped in the mythology of the Ramayana epic. The broad, tiered cascade tumbles roadside through ancient rock, making it impossible to pass without stopping.",
    image: "/images/ravana.png"
  },
  {
    badge: "8.4 KM AWAY",
    category: "ADVENTURER'S PEAK",
    title: "Wangedigala",
    location: "Kalupahana, Badulla",
    desc: "A rugged off-the-beaten-path summit rising above the Ella gap. The challenging trail rewards trekkers with sweeping views of the southern lowlands that stretch all the way to the horizon.",
    image: "/images/wangedigala.png"
  },


];

export const Places = () => {
  useEffect(() => {
    document.title = "Explore Places | A'Lankaa Resorts & Spa";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-obsidian min-h-screen pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-[32px] lg:px-[80px]">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-jost text-[10px] text-gold uppercase tracking-[0.4em] mb-4 block">
            Discover
          </span>
          <h1 className="font-cormorant text-[40px] md:text-[56px] text-ivory mb-6 leading-tight">
            Explore More Places
          </h1>
          <div className="w-12 h-px bg-gold/50 mx-auto" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
          {attractions.map((attr, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: (idx % 2) * 0.15 }}
              viewport={{ once: true, margin: '-10%' }}
              className="relative h-[360px] lg:h-[480px] overflow-hidden group border border-transparent hover:border-gold/40 transition-colors duration-500"
            >
              <img
                src={attr.image}
                alt={attr.title}
                className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent bottom-0 h-full pointer-events-none" />

              <div className="absolute top-6 left-6 inline-block bg-gold px-[14px] py-[6px] font-jost text-[9px] text-void tracking-[0.15em] font-medium z-10 transition-transform duration-500 group-hover:scale-105">
                {attr.badge}
              </div>

              <div className="absolute inset-x-8 bottom-10 z-10 flex flex-col justify-end transition-transform duration-500 group-hover:-translate-y-2">
                <span className="gold-label-on-image font-jost text-[9px] text-gold uppercase tracking-[0.2em] mb-2">
                  {attr.category}
                </span>
                <h3 className="card-heading-on-image font-cormorant text-[clamp(28px,3vw,40px)] text-ivory font-light leading-none">
                  {attr.title}
                </h3>
                <p className="card-text-on-image font-dmSans font-light text-[12px] text-smoke/90 mt-1">
                  {attr.location}
                </p>

                <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-700 mt-0 group-hover:mt-3">
                  <p className="card-text-on-image font-dmSans font-light text-[13px] text-smoke/80 leading-relaxed mb-3">
                    {attr.desc}
                  </p>
                  <a href="#" className="gold-label-on-image font-jost text-[10px] text-gold hover:text-gold-light inline-block relative after:content-[''] after:absolute after:w-0 after:h-px after:bottom-0 after:left-0 after:bg-gold-light hover:after:w-full after:transition-all after:duration-300">
                    Learn More →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Places;
