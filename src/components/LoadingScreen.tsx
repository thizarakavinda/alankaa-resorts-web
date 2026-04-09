import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const LoadingScreen = () => {
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsComplete(true),
    });


    tl.to(lineRef.current, {
      width: '60px',
      duration: 0.6,
      ease: 'power2.out',
    }, 0);


    tl.fromTo(logoRef.current, {
      opacity: 0,
      y: 20,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, 0.6);


    tl.fromTo(subtitleRef.current, {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 0.6,
      ease: 'fade',
    }, 1.2);


    if (counterRef.current) {
      tl.to(counterRef.current, {
        innerHTML: 100,
        duration: 0.7,
        snap: { innerHTML: 1 },
        ease: 'none',
        onUpdate: function () {
          if (counterRef.current) {
            counterRef.current.innerHTML = Math.round(this.targets()[0].innerHTML) + '%';
          }
        }
      }, 1.8);
    }


    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power2.inOut',
    }, 2.5);

    return () => {
      tl.kill();
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-void"
    >
      <div className="flex flex-col items-center gap-4">
        <h1
          ref={logoRef}
          className="font-cormorant text-[48px] text-ivory tracking-[0.3em] uppercase opacity-0 translate-y-5"
        >
          A'Lankaa
        </h1>

        <div className="h-[1px] w-0 bg-gold" ref={lineRef}></div>

        <p
          ref={subtitleRef}
          className="font-jost text-[11px] text-gold tracking-[0.5em] uppercase opacity-0"
        >
          Resorts & Spa
        </p>
      </div>

      <div
        ref={counterRef}
        className="absolute bottom-12 right-12 font-jost text-[13px] text-fog tracking-widest"
      >
        0%
      </div>
    </div>
  );
};
