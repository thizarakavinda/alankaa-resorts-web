import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image clip-path reveal
      gsap.fromTo(
        imgRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.4,
          ease: 'power4.inOut',
          delay: 0.1, // Small delay for rendering
        }
      );

      // Image scale effect
      const img = imgRef.current?.querySelector('img');
      if (img) {
        gsap.fromTo(img, 
          { scale: 1.1 }, 
          { scale: 1, duration: 2.5, ease: 'power3.out', delay: 0.1 }
        );
      }

      // Content fade up
      gsap.fromTo(
        contentRef.current?.children ? Array.from(contentRef.current.children) : [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.8,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[90vh] w-full overflow-hidden flex flex-col justify-between"
    >
      {/* Background Image Placeholder */}
      <div 
        ref={imgRef}
        className="absolute inset-0 w-full h-full bg-mist" 
      >
        <img 
          src="/images/Sunrise View Suite 16.jpg"
          alt="A'Lankaa Resort Aerial View"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Layer 2: Dark gradient overlay */}
      <div className="absolute inset-0 bg-hero-gradient mix-blend-multiply" style={{ background: 'var(--grad-hero)' }}></div>

      {/* Breadcrumb - Top Left */}
      <div className="relative z-10 p-10 lg:p-[40px]">
        <p className="font-jost text-[10px] text-fog tracking-[0.2em] uppercase">
          Home / About Us
        </p>
      </div>

      {/* Content - Bottom Left */}
      <div 
        ref={contentRef}
        className="relative z-10 p-10 lg:p-[80px]"
      >
        <p className="font-jost text-[10px] text-gold tracking-[0.5em] uppercase mb-6 drop-shadow-sm">
          OUR STORY
        </p>
        <h1 className="font-cormorant text-[clamp(48px,6vw,96px)] text-ivory font-light leading-none mb-6">
          About A'Lankaa
        </h1>
        <p className="font-dmSans font-light text-[15px] text-smoke/90 max-w-[600px] leading-[2] tracking-wide">
          A singular vision. An extraordinary location.<br />
          A commitment to hospitality without compromise.
        </p>
      </div>
    </section>
  );
};
