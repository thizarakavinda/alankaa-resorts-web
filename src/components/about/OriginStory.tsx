import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const OriginStory = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const rightImagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const leftItems = leftContentRef.current?.children ? Array.from(leftContentRef.current.children) : [];

      gsap.fromTo(
        leftItems.filter(item => item !== lineRef.current),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );


      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power3.out',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );


      const imgContainers = rightImagesRef.current?.querySelectorAll('.img-container');
      if (imgContainers) {
        gsap.fromTo(
          imgContainers,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-obsidian py-[100px] lg:py-[140px] px-8 lg:px-[80px]"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[55%_auto] gap-16 lg:gap-20 items-center">

        {/* left cont */}
        <div ref={leftContentRef} className="flex flex-col">
          <p className="font-jost text-[10px] text-gold tracking-[0.3em] uppercase mb-6">
            HALDUMMULLA · SRI LANKA
          </p>

          <h2 className="font-cormorant text-[clamp(36px,4vw,64px)] text-ivory font-light leading-[1.1] mb-10">
            Born from a rock,<br />
            built for the<br />
            discerning traveller.
          </h2>

          <div
            ref={lineRef}
            className="h-px bg-gold/60 w-[80px] mb-12"
          />

          <div className="font-dmSans font-light text-[15px] text-smoke/90 leading-[2.2] tracking-wide space-y-8 max-w-[540px]">
            <p>
              It began with a singular vision. Our founders, guided by an unwavering appreciation for the dramatic landscapes of Sri Lanka's hill country, sought out the most extraordinary canvas. They found it here—on a solid granite peak at precisely 1,200 meters above the sea.
            </p>
            <p>
              Our philosophy at A'Lankaa is simple: nature is the ultimate luxury. The resort's architecture bows to the breathtaking 360-degree panoramas, where misty morning atmospheres seamlessly blend into the expansive, unhindered horizons.
            </p>
            <p>
              Every detail is underscored by a profound commitment to warm Sri Lankan hospitality. Here, the boutique experience is meticulously tailored, ensuring that personalized service and serene luxury are woven into every moment of your stay.
            </p>
          </div>
        </div>

        {/* right imgs */}
        <div ref={rightImagesRef} className="relative mt-12 lg:mt-0 pb-16 lg:pb-0 pr-8 lg:pr-0 group">
          <div className="img-container relative w-full aspect-[4/3] border-[1px] border-gold/15 flex-shrink-0 overflow-hidden">
            <img
              src="/images/rock 2.jpg"
              alt="A'Lankaa Resort Architecture"
              className="w-full h-full object-cover scale-105 transition-transform duration-[3s] ease-out group-hover:scale-[1.1]"
            />
          </div>
          <div className="img-container absolute -bottom-12 -right-4 lg:-bottom-20 lg:-right-10 w-[60%] aspect-[3/4] border-[1px] border-gold/15 z-10 bg-obsidian overflow-hidden">
            <img
              src="/images/rock 1.jpeg"
              alt="A'Lankaa Resort Interior Detail"
              className="w-full h-full object-cover scale-105 transition-transform duration-[3s] ease-out group-hover:scale-[1.12]"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
