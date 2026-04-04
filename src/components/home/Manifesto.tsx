import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitWords } from '../../utils/textSplitter';

export const Manifesto = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      const words = textRef.current.querySelectorAll('.split-word');
      
      gsap.to(words, {
        clipPath: 'inset(0% 0 0 0)',
        stagger: 0.1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        }
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-forest flex flex-col items-center justify-center px-6 relative">
      
      <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-obsidian to-transparent opacity-80" />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-[1000px] mx-auto">
        <div className="h-[1px] w-[60px] bg-gold mb-12" />
        
        <div ref={textRef} className="font-cormorant italic text-[clamp(28px,5vw,72px)] text-ivory leading-tight mb-12 flex flex-wrap justify-center gap-x-3 gap-y-2">
           <SplitWords text="Some places ask you to unpack your bags. A'Lankaa asks you to unpack your mind." />
        </div>
        
        <p className="font-jost text-[10px] text-gold uppercase tracking-[0.4em]">
          — A'LANKAA RESORTS & SPA
        </p>
      </div>

    </section>
  );
};
