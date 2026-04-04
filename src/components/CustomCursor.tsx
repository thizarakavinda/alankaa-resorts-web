import { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const render = () => {
      // Lerp for the ring
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(render);

    // Hover logic
    const applyHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest('a, button, .hoverable');
      
      if (hoverable && ringRef.current && dotRef.current && textRef.current) {
        ringRef.current.style.width = '64px';
        ringRef.current.style.height = '64px';
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(0)`;
        
        // Context aware text
        const text = hoverable.getAttribute('data-cursor-text') || 'VIEW';
        textRef.current.innerText = text;
        textRef.current.style.opacity = '1';
      } else if (ringRef.current && dotRef.current && textRef.current) {
        ringRef.current.style.width = '36px';
        ringRef.current.style.height = '36px';
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(1)`;
        textRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mouseover', applyHover);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', applyHover);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-[36px] h-[36px] border border-gold rounded-full pointer-events-none z-[9999] flex items-center justify-center transition-[width,height] duration-300 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <span ref={textRef} className="text-gold font-jost text-[9px] uppercase tracking-widest opacity-0 transition-opacity duration-300">
          VIEW
        </span>
      </div>
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-[8px] h-[8px] bg-gold rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
  );
};
