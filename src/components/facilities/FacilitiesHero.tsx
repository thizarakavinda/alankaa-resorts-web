import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FacilitiesHero = () => {
    const labelRef = useRef<HTMLParagraphElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Animate decorative line
        tl.fromTo(
            lineRef.current,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.8 }
        )
            // Label slides up + fades
            .fromTo(
                labelRef.current,
                { y: 20, opacity: 0, letterSpacing: '0.5em' },
                { y: 0, opacity: 1, letterSpacing: '0.2em', duration: 0.9 },
                '-=0.3'
            )
            // Headline word-by-word stagger
            .fromTo(
                headlineRef.current,
                { y: 60, opacity: 0, skewY: 3 },
                { y: 0, opacity: 1, skewY: 0, duration: 1.1 },
                '-=0.5'
            )
            // Subtext fades in with slight blur
            .fromTo(
                subtextRef.current,
                { y: 24, opacity: 0, filter: 'blur(4px)' },
                { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1 },
                '-=0.6'
            );
    }, []);

    return (
        <section className="relative h-[70vh] w-full flex items-end justify-center pb-[25vh] overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full bg-[var(--clr-charcoal)]">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    className="w-full h-full object-cover opacity-60"
                >
                    <source src="/videos/gymspa.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

            <div className="relative z-10 text-center px-4 max-w-4xl">
                {/* Decorative line */}
                <div
                    ref={lineRef}
                    className="w-12 h-[1px] bg-[var(--clr-gold)] mx-auto mb-5"
                />

                <p
                    ref={labelRef}
                    className="text-[var(--clr-gold)] tracking-[0.2em] text-sm font-semibold mb-4 uppercase gold-label-on-image opacity-0"
                >
                    Amenities
                </p>

                <h1
                    ref={headlineRef}
                    className="text-4xl md:text-6xl lg:text-7xl font-cormorant text-[var(--clr-ivory)] mb-6 leading-tight drop-shadow-lg hero-headline-on-image opacity-0"
                >
                    Crafted for your comfort.
                </h1>

                <p
                    ref={subtextRef}
                    className="text-lg md:text-xl text-[var(--clr-cream)]/90 max-w-2xl mx-auto font-dmSans leading-relaxed drop-shadow-md hero-subtext-on-image opacity-0"
                >
                    Every facility, every experience —<br className="hidden md:block" /> designed with intention.
                </p>
            </div>
        </section>
    );
};

export default FacilitiesHero;