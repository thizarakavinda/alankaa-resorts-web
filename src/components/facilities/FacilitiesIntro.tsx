import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FacilitiesIntro = () => {
    const labelRef = useRef<HTMLParagraphElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const bodyRef = useRef<HTMLParagraphElement>(null);
    const mosaicRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: labelRef.current,
                start: 'top 80%',
            },
            defaults: { ease: 'power3.out' },
        });


        tl.fromTo(
            labelRef.current,
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7 }
        )

            .fromTo(
                headlineRef.current,
                { y: 50, opacity: 0, skewY: 2 },
                { y: 0, opacity: 1, skewY: 0, duration: 1 },
                '-=0.3'
            )

            .fromTo(
                bodyRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9 },
                '-=0.6'
            )

            .fromTo(
                mosaicRef.current,
                { x: 60, opacity: 0 },
                { x: 0, opacity: 1, duration: 1 },
                '-=0.8'
            );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section className="bg-[var(--clr-obsidian)] py-[100px] px-6 md:px-[80px]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* left txt */}
                <div>
                    <p
                        ref={labelRef}
                        className="text-[var(--clr-gold)] tracking-[0.2em] text-xs font-bold mb-6 opacity-0"
                    >
                        WORLD-CLASS AMENITIES
                    </p>
                    <h2
                        ref={headlineRef}
                        className="text-4xl md:text-5xl lg:text-6xl font-cormorant text-[var(--clr-ivory)] leading-tight mb-8 opacity-0"
                    >
                        In nature's lap, luxury finds <br className="hidden lg:block" /> its truest form.
                    </h2>
                    <p
                        ref={bodyRef}
                        className="font-dmSans text-[var(--clr-smoke)] max-w-[500px] text-lg leading-relaxed opacity-0"
                    >
                        From our mountain-view infinity pool to the holistic wellness sanctuary, every space is designed to harmonize with the elements. Discover amenities that elevate your escape.
                    </p>
                </div>


                <div
                    ref={mosaicRef}
                    className="grid grid-cols-2 gap-4 h-[400px] md:h-[500px] opacity-0"
                >
                    <div className="flex flex-col gap-4 pt-12">
                        <div className="bg-[var(--clr-charcoal)] flex-1 rounded-sm overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600"
                                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                                alt="Spa Detail"
                            />
                        </div>
                        <div className="bg-[var(--clr-charcoal)] h-40 rounded-sm overflow-hidden">
                            <img
                                src="/images/Pool 02.jpg"
                                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                                alt="Pool Detail"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 pb-12">
                        <div className="bg-[var(--clr-charcoal)] h-48 rounded-sm overflow-hidden">
                            <img
                                src="/images/nature dining.jpg"
                                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                                alt="Dining Detail"
                            />
                        </div>
                        <div className="bg-[var(--clr-charcoal)] flex-1 rounded-sm overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600"
                                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                                alt="Massage Detail"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FacilitiesIntro;