import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { spaMenuData } from '../../data/facilitiesData';

gsap.registerPlugin(ScrollTrigger);

const SpaTreatments = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

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
                '.spa-divider',
                { scaleX: 0, transformOrigin: 'center' },
                { scaleX: 1, duration: 0.6 }
            )

                .fromTo(
                    headingRef.current,
                    { y: 55, opacity: 0, skewY: 2 },
                    { y: 0, opacity: 1, skewY: 0, duration: 1.05 },
                    '-=0.2'
                )

                .fromTo(
                    subRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    '-=0.6'
                )

                .fromTo(
                    cardsRef.current ? Array.from(cardsRef.current.children) : [],
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.75,
                        stagger: 0.15,
                    },
                    '-=0.4'
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-[var(--clr-obsidian)] py-[120px] px-6 md:px-[80px]">
            <div className="max-w-6xl mx-auto">

                {/* h1 block */}
                <div className="text-center mb-16">

                    <div className="spa-divider w-16 h-[1px] bg-[var(--clr-gold)] mx-auto mb-8 opacity-0 scale-x-0" />

                    <h2
                        ref={headingRef}
                        className="text-4xl md:text-5xl lg:text-6xl font-cormorant text-[var(--clr-ivory)] mb-6 opacity-0"
                    >
                        Signature Spa Treatments
                    </h2>
                    <p
                        ref={subRef}
                        className="font-dmSans text-[var(--clr-smoke)] text-lg opacity-0"
                    >
                        Book in advance — spaces are limited.
                    </p>
                </div>

                {/* cards */}
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {spaMenuData.map((spa, i) => (
                        <motion.div
                            key={i}
                            initial="initial"
                            whileHover="hover"
                            className="relative bg-[var(--clr-charcoal)] border border-[var(--clr-mist)] p-10 flex flex-col justify-between min-h-[320px] opacity-0"
                        >

                            <motion.div
                                variants={{
                                    initial: { scaleX: 0 },
                                    hover: { scaleX: 1 },
                                }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                className="absolute top-0 left-0 w-full h-[2px] bg-[var(--clr-gold)] origin-left"
                            />

                            <div>
                                <h3 className="text-2xl md:text-3xl font-cormorant text-[var(--clr-ivory)] mb-3">
                                    {spa.title}
                                </h3>
                                <div className="text-[var(--clr-gold)] font-dmSans text-sm tracking-[0.2em] font-semibold mb-6 flex items-center gap-2">
                                    {spa.duration} <span className="opacity-50">•</span> {spa.price}
                                </div>
                                <p className="text-[var(--clr-smoke)] font-dmSans leading-relaxed mb-10">
                                    {spa.desc}
                                </p>
                            </div>

                            <a
                                href="/contact"
                                className="text-[var(--clr-gold)] font-dmSans text-sm tracking-[0.1em] hover:text-[var(--clr-ivory)] transition-colors duration-300 w-fit uppercase flex items-center gap-2 mt-auto"
                            >
                                Enquire <span className="text-lg">→</span>
                            </a>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default SpaTreatments;