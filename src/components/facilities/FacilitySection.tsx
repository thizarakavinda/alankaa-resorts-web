import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { FacilityItem } from '../../data/facilitiesData';

gsap.registerPlugin(ScrollTrigger);

interface FacilitySectionProps {
    facility: FacilityItem;
}

const FacilitySection = ({ facility }: FacilitySectionProps) => {
    const { label, title, body, details, img, reverse } = facility;

    const sectionRef = useRef<HTMLElement>(null);
    const labelRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const bodyRef = useRef<HTMLParagraphElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 78%',
                },
                defaults: { ease: 'power3.out' },
            });

            const xFrom = reverse ? 40 : -40;

            // Gold label
            tl.fromTo(
                labelRef.current,
                { x: xFrom, opacity: 0, letterSpacing: '0.5em' },
                { x: 0, opacity: 1, letterSpacing: '0.2em', duration: 0.7 }
            )
                // Title with lift + slight skew
                .fromTo(
                    titleRef.current,
                    { y: 50, opacity: 0, skewY: 2 },
                    { y: 0, opacity: 1, skewY: 0, duration: 1 },
                    '-=0.4'
                )
                // Body copy
                .fromTo(
                    bodyRef.current,
                    { y: 25, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.85 },
                    '-=0.6'
                )
                // List items stagger in one by one
                .fromTo(
                    listRef.current ? Array.from(listRef.current.children) : [],
                    { x: xFrom * 0.5, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.55,
                        stagger: 0.1,
                    },
                    '-=0.5'
                );
        }, sectionRef);

        return () => ctx.revert();
    }, [reverse]);

    return (
        <section
            ref={sectionRef}
            className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch w-full min-h-[70vh] bg-[var(--clr-void)]`}
        >
            {/* Image Side */}
            <div className="w-full lg:w-1/2 p-6 md:p-10 lg:p-14 flex flex-col">
                <div
                    className="relative w-full flex-1 min-h-[40vh] md:min-h-[50vh] overflow-hidden group facility-image-reveal"
                    data-reverse={reverse}
                >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700 z-10 pointer-events-none" />
                    <img
                        src={img}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    />
                </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 py-16 md:p-16 lg:p-24 bg-[var(--clr-void)] relative">
                <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />

                <div className="w-full max-w-lg relative z-10">
                    <p
                        ref={labelRef}
                        className="text-[var(--clr-gold)] tracking-[0.2em] text-xs font-bold mb-4 uppercase opacity-0"
                    >
                        {label}
                    </p>

                    <h3
                        ref={titleRef}
                        className="text-3xl md:text-5xl font-cormorant text-[var(--clr-ivory)] mb-6 leading-tight opacity-0"
                    >
                        {title}
                    </h3>

                    <p
                        ref={bodyRef}
                        className="font-dmSans text-[var(--clr-smoke)] text-base md:text-lg mb-10 leading-relaxed opacity-0"
                    >
                        {body}
                    </p>

                    <ul ref={listRef} className="space-y-4">
                        {details.map((detail, i) => (
                            <li
                                key={i}
                                className="flex items-center gap-4 text-[var(--clr-smoke)] font-dmSans opacity-0"
                            >
                                <span className="text-[var(--clr-gold)]">{detail.icon}</span>
                                <span className="text-sm md:text-base">{detail.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default FacilitySection;