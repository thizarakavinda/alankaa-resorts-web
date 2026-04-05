import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const noiseSvg = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pinning the section. Reduced from +=150% to +=60% so it doesnt feel stuck for long!
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=60%',
        pin: true,
        scrub: 1,
      });

      // Split text reveal manually using robust clip-path
      gsap.fromTo(textRefs.current, 
        { clipPath: 'inset(100% 0 0 0)', y: 30, opacity: 0 },
        { 
          clipPath: 'inset(0% 0 0 0)', 
          y: 0, 
          opacity: 1,
          duration: 1.4, 
          stagger: 0.15, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top+=10%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-void flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0 bg-obsidian">
        <img src="/images/Sunrise View Suite 16.jpg" alt="A'Lankaa Resorts" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("${noiseSvg}")` }} />
      </div>

      <div className="relative z-10 w-full max-w-[900px] px-6 flex flex-col items-center text-center">
        <span className="gold-label-on-image font-jost text-[10px] text-gold uppercase tracking-[0.5em] mb-12" data-aos="fade-up">
          Photography Experiences
        </span>
        
        <div className="hero-headline-on-image font-cormorant text-[clamp(52px,7vw,110px)] text-ivory font-light leading-[0.92] text-center mb-10 flex flex-col items-center">
          {["Your most beautiful", "moments deserve", "an extraordinary backdrop."].map((line, i) => (
             <div key={i} className="overflow-hidden p-1">
               <div ref={(el) => { textRefs.current[i] = el; }}>{line}</div>
             </div>
          ))}
        </div>

        <p className="hero-subtext-on-image font-dmSans text-[17px] text-smoke font-light max-w-[580px] mx-auto opacity-0 animate-[fadeIn_1s_ease_1s_forwards]" data-aos="fade-up" data-aos-delay="300">
          At 1,000 metres above sea level, every frame is extraordinary. Every backdrop, unforgettable.
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-0 animate-[fadeIn_1s_ease_2s_forwards]">
        <div className="w-[1px] h-12 bg-gradient-to-b from-fog to-transparent" />
        <span className="hero-subtext-on-image font-jost text-[9px] text-fog uppercase tracking-[0.4em]">Explore Shoots</span>
      </div>
    </section>
  );
};

export default HeroSection;
