import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import PhotographyFeature from '../components/home/PhotographyFeature';
import { LocationShowcase } from '../components/home/LocationShowcase';

export const Home = () => {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Spotlight effect for modern dynamic dark sections
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    currentTarget.style.setProperty('--mouse-x', `${x}px`);
    currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  useEffect(() => {
    // Basic GSAP interactions
    if (heroTextRef.current) {
      gsap.fromTo(heroTextRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 3 // Wait for loader
        }
      );
    }

    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 75%'
          }
        }
      );
    }
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };


  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-void min-h-screen text-cream overflow-hidden"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20">
        <div className="absolute inset-0 z-0 bg-void">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/videos/backvid.mp4" type="video/mp4" />
          </video>
          {/* Soft, premium ambient overlay */}
          <div className="absolute inset-0 bg-black/30" />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-[var(--grad-hero)]" />
        </div>

        <div className="relative z-10 max-w-[1920px] mx-auto px-6 text-center mt-20">
          <h2 className="font-jost text-[14px] text-gold tracking-[0.4em] uppercase mb-6 opacity-0 animate-[fadeIn_1s_ease_3s_forwards]">
            Welcome to the Edge of the World
          </h2>
          <h1
            ref={heroTextRef}
            className="font-cormorant text-[max(48px,10vw)] leading-none tracking-tight mb-8 font-normal opacity-80"
          >
            <span className="inline-block bg-gradient-to-b from-white via-ivory to-gold text-transparent bg-clip-text select-none pb-2">Quiet</span> <span className="inline-block bg-gradient-to-b from-white via-ivory to-gold text-transparent bg-clip-text select-none pb-2">Luxury.</span><br />
            <span className="inline-block bg-gradient-to-b from-white via-ivory to-gold text-transparent bg-clip-text select-none pb-2">Elevated.</span>
          </h1>
        </div>

        <button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 animate-[fadeIn_1s_ease_4s_forwards] group cursor-pointer hover:scale-105 transition-transform duration-500"
        >
          <span className="font-jost text-[12px] text-fog group-hover:text-gold uppercase tracking-widest transition-colors duration-500">Scroll to Discover</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-gold/50 to-transparent group-hover:from-gold transition-colors duration-500" />
          <ChevronDown className="w-4 h-4 text-gold/80 group-hover:text-gold animate-bounce" strokeWidth={1} />
        </button>
      </section>

      {/* Intro Section */}
      <section
        className="py-32 px-6 md:px-20 relative bg-obsidian overflow-hidden group"
        onMouseMove={handleMouseMove}
      >
        {/* Antigravity-style Cursor Spotlight */}
        <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 mix-blend-screen"
          style={{ background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(184,150,90,0.06), transparent 40%)' }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-dmSerif text-[36px] md:text-[64px] text-ivory mb-12">
            A Sanctuary Above the Clouds.
          </h2>
          <p className="font-dmSans text-[16px] text-smoke leading-relaxed max-w-2xl mx-auto">
            Perched 1,000 meters above sea level in the misty mountains of Haldummulla, A'Lankaa Resorts & Spa is an immersive digital experience—a retreat where architectural elegance seamlessly blends with breathtaking natural panoramas.
          </p>
        </div>
      </section>

      {/* Feature Section with Image Reveal */}
      <section
        ref={sectionRef}
        className="py-24 px-6 md:px-20 bg-void max-w-[1920px] mx-auto min-h-screen flex items-center relative overflow-hidden group"
        onMouseMove={handleMouseMove}
      >
        {/* Antigravity-style Cursor Spotlight */}
        <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 mix-blend-screen"
          style={{ background: 'radial-gradient(1000px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.03), transparent 40%)' }}
        />

        <div className="flex flex-col items-center max-w-3xl mx-auto w-full relative z-10 text-center">
          <span className="font-jost text-[10px] text-gold uppercase tracking-[0.2em] mb-4 block">The Architecture</span>
          <h3 className="font-cormorant text-[36px] md:text-[48px] text-ivory mb-6 leading-tight">
            Crafted from the Earth.
          </h3>
          <p className="font-dmSans text-[16px] text-smoke mb-10 leading-relaxed">
            Every space within A'Lankaa has been thoughtfully designed to disappear into its surroundings. We utilize locally sourced stone, aged timber, and vast expanses of glass to ensure that nature remains the ultimate centerpiece.
          </p>
          <button className="border-b border-gold pb-2 font-jost text-[11px] text-gold uppercase tracking-widest hover:text-cream transition-colors group">
            Discover the Suites <span className="inline-block group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>
      </section>

      {/* The Premium Destination Showcase (Replaces Google Maps) */}
      <LocationShowcase />

      {/* spacer to allow scrolling */}
      <div className="h-[20vh] bg-void" />

      {/* Photography & Shoots Massive Feature Block */}
      <PhotographyFeature />

    </motion.main>
  );
};
