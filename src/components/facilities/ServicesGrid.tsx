import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesData } from '../../data/facilitiesData';

gsap.registerPlugin(ScrollTrigger);

const ServicesGrid = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                defaults: { ease: 'power3.out' },
            });

            tl.fromTo(
                headingRef.current,
                { y: 50, opacity: 0, skewY: 1.5 },
                { y: 0, opacity: 1, skewY: 0, duration: 1 }
            )
                .fromTo(
                    gridRef.current ? Array.from(gridRef.current.children) : [],
                    { y: 40, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.08,
                    },
                    '-=0.5'
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-[var(--clr-charcoal)] py-[100px] px-6 md:px-[80px]"
        >
            <div className="max-w-7xl mx-auto">
                <h2
                    ref={headingRef}
                    className="text-4xl md:text-5xl font-cormorant text-[var(--clr-ivory)] mb-16 text-center opacity-0"
                >
                    Additional Services
                </h2>

                <div
                    ref={gridRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {servicesData.map((srv, i) => (
                        <div
                            key={i}
                            className="group relative bg-transparent p-10 text-center transition-all duration-500 hover:bg-[var(--clr-obsidian)] cursor-pointer overflow-hidden opacity-0"
                        >
                            {/* img icons */}
                            <div className="mx-auto w-20 h-20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 ease-out">
                                <img
                                    src={srv.icon}
                                    alt={srv.title}
                                    className="w-16 h-16 object-contain"
                                />
                            </div>

                            <h4 className="text-[var(--clr-cream)] font-dmSans text-lg tracking-wide">
                                {srv.title}
                            </h4>

                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--clr-gold)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center ease-out" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;