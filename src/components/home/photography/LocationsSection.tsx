import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  { num: "01", name: "Infinity Pool", img: "/images/Pool 02.jpg", tags: ["Wedding", "Pre-shoot", "Western", "Lifestyle"], desc: "Our infinity pool appears to dissolve into the mountain horizon. At golden hour, the water mirrors the sky — creating reflections that make every frame look like a painting.", reverse: false },
  { num: "02", name: "Sunrise Viewpoint", img: "/images/Room 10.jpg", tags: ["Kandyan", "Wedding", "Lifestyle", "Solo"], desc: "The most spectacular sunrise in Sri Lanka — witnessed from 1,000 metres. A private viewpoint accessible exclusively to A'Lankaa guests. Golden light. Misty valleys. Silence.", reverse: true, special: "BEST TIME:\n5:30 AM – 7:00 AM · Advance booking required" },
  { num: "03", name: "Rock Formations", img: "/images/kandiyan 2.jpg", tags: ["Kandyan", "Wedding", "Western", "Editorial"], desc: "Perched upon ancient volcanic rock — A'Lankaa's natural terrain offers a raw, dramatic backdrop unlike any studio. Kandyan shoots here are utterly striking.", reverse: false },
  { num: "04", name: "Heritage Gardens", img: "/images/kandiyan 3.jpg", tags: ["Kandyan", "Wedding", "Family", "Lifestyle"], desc: "Manicured gardens with tropical flora, gentle mist, and the mountains beyond. A natural stage that needs no artificial decoration.", reverse: true }
];

const LocationsSection = () => {
  return (
    <section className="bg-obsidian">
      {locations.map((loc, i) => (
        <LocationRow key={i} loc={loc} />
      ))}
    </section>
  );
};

const LocationRow = ({ loc }: any) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current, 
        { clipPath: loc.reverse ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: rowRef.current,
            start: 'top 80%'
          }
        }
      );
    }, rowRef);
    return () => ctx.revert();
  }, [loc.reverse]);

  return (
    <div ref={rowRef} className={`flex flex-col md:flex-row h-auto min-h-[85vh] ${loc.reverse ? 'bg-obsidian' : 'bg-void'}`}>
      {/* Image Panel */}
      <div className={`w-full h-[50vh] md:h-auto md:w-[55%] relative flex items-center justify-center p-8 md:p-20 ${loc.reverse ? 'order-1 md:order-2' : 'order-1'}`}>
        <div ref={imgRef} className="relative w-full h-full max-h-[70vh] bg-transparent overflow-hidden shadow-2xl">
          <img src={loc.img} alt={loc.name} className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>

      {/* Content Panel */}
      <div className={`w-full md:w-[45%] p-10 md:p-[80px_64px] flex flex-col justify-center relative ${loc.reverse ? 'order-2 md:order-1 bg-obsidian' : 'order-2 bg-void'}`}>
        <span className="absolute top-10 right-10 font-cormorant text-[120px] text-gold opacity-5 leading-none pointer-events-none select-none hidden md:block">
          {loc.num}
        </span>

        <div data-aos="fade-up" data-aos-offset="100">
          <span className="font-jost text-[10px] text-gold uppercase tracking-[0.3em] block mb-4">Shoot Location</span>
          <h2 className="font-cormorant text-[clamp(36px,4vw,60px)] text-ivory leading-none mb-6">{loc.name}</h2>
          <div className="w-[48px] h-[1px] bg-gold/50 mb-6" />
          
          <p className="font-dmSans text-[15px] font-light text-smoke leading-[1.9] mb-8 max-w-[440px]">
            {loc.desc}
          </p>

          <div className="flex flex-wrap gap-3 mb-10 max-w-[400px]">
            {loc.tags.map((t: string) => (
              <span key={t} className="font-jost text-[10px] text-gold uppercase border border-gold/40 px-4 py-[6px] rounded-full bg-gold/5">
                {t}
              </span>
            ))}
          </div>

          {loc.special && (
            <div className="bg-gold/5 border-l-2 border-gold p-[16px_20px] mb-10 max-w-[400px]">
               <span className="font-jost text-[10px] text-fog uppercase block mb-1">BEST TIME:</span>
               <span className="font-dmSans text-[14px] text-cream whitespace-pre-line">{loc.special.split(':\n')[1]}</span>
            </div>
          )}

          <button className="font-jost text-[11px] text-ivory border border-gold/40 px-8 py-4 uppercase tracking-widest hover:bg-gold hover:border-gold hover:text-void transition-colors duration-300 inline-flex items-center gap-3">
            Book This Location <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationsSection;
