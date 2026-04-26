import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plane, Car, Train, MapPin, ArrowUpRight, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Part1Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headingRefs = useRef<Array<HTMLHeadingElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.to(imageRef.current, {
        yPercent: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });


      if (headingRefs.current.length > 0) {
        gsap.fromTo(
          headingRefs.current,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 60%',
            }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[100vh] lg:h-[90vh] overflow-hidden bg-void flex flex-col justify-end max-md:pb-32">
      {/* back img */}
      <img
        ref={imageRef}
        src="/images/pool view.jpg"
        alt="A'Lankaa Resorts Aerial View"
        className="absolute inset-0 w-full h-[120%] object-cover object-center -top-[10%]"
      />


      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.5) 40%, rgba(8,8,8,0.1) 70%, rgba(8,8,8,0) 100%)'
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(8,8,8,0.6) 0%, rgba(8,8,8,0) 50%)'
        }}
      />


      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* top left */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        viewport={{ once: true }}
        className="absolute top-0 left-0 p-[24px] lg:p-[56px]"
      >
        <p className="font-jost text-[10px] text-gold uppercase tracking-[0.5em] max-md:tracking-[0.3em]">
          SRI LANKA · BADULLA DISTRICT · HALDUMMULLA
        </p>
      </motion.div>

      {/* top right */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 1 }}
        viewport={{ once: true }}
        className="absolute top-0 right-0 p-[24px] lg:p-[56px] text-right"
      >
        <p className="font-cormorant italic text-[18px] text-smoke opacity-60">6°N 80°E</p>
        <p className="font-jost text-[11px] text-gold uppercase tracking-[0.3em] mt-1 hidden md:block">1,200m ASL</p>
      </motion.div>

      {/* bottom center part */}
      <div className="relative lg:absolute lg:inset-x-0 lg:bottom-0 p-[24px] lg:p-[56px_80px] mt-[120px] lg:mt-0 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 z-10 w-full">
        {/* bottom lft */}
        <div className="w-full lg:w-auto">
          <p className="gold-label-on-image font-jost text-gold text-[10px] uppercase tracking-[0.4em] mb-4">
            THE DESTINATION
          </p>
          <div className="hero-headline-on-image font-cormorant text-[clamp(40px,5vw,72px)] text-ivory font-light leading-[0.95]">
            <h2 ref={el => { headingRefs.current[0] = el; }} className="pb-1">Perched above the world,</h2>
            <h2 ref={el => { headingRefs.current[1] = el; }} className="pb-1">hidden in the clouds.</h2>
          </div>
          <p className="hero-subtext-on-image font-dmSans text-[15px] max-md:text-[14px] text-smoke max-w-[520px] leading-[1.9] mt-5">
            Nestled at 1,200 metres above sea level on ancient volcanic rock in Haldummulla, Badulla — A'Lankaa is one of Sri Lanka's most dramatically situated luxury resorts. Surrounded by misty mountains, tea-country roads, and the silence of clouds.
          </p>

          {/* stst */}
          <div className="flex gap-4 lg:gap-[48px] mt-8 overflow-hidden items-center">
            <StatsCounter number="1,200m" label="Elevation" />
            <div className="w-px h-[40px] bg-mist max-md:mx-2" />
            <StatsCounter number="32km" label="from Badulla" />
            <div className="w-px h-[40px] bg-mist max-md:mx-2" />
            <StatsCounter number="5 hrs" label="from Colombo" />
          </div>
        </div>

        {/* bottom right card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="w-full lg:w-[280px] bg-black/85 backdrop-blur-[20px] border border-gold/20 border-l-[2px] border-l-gold p-8 max-md:p-6 rounded-[2px]"
        >
          <p className="font-jost text-[9px] text-gold uppercase tracking-[0.3em]">
            HOW TO REACH US
          </p>
          <div className="w-[32px] h-[1px] bg-gold my-4" />

          <div className="space-y-6 max-md:space-y-4">
            <div className="flex gap-4">
              <Plane className="w-[14px] h-[14px] text-gold shrink-0 mt-1" />
              <div>
                <p className="card-heading-on-image font-dmSans font-medium text-[13px] text-cream">Nearest Airport</p>
                <p className="card-text-on-image font-dmSans font-light text-[12px] text-smoke mt-1">Mattala Rajapaksa — ~96km</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Car className="w-[14px] h-[14px] text-gold shrink-0 mt-1" />
              <div>
                <p className="card-heading-on-image font-dmSans font-medium text-[13px] text-cream">Road from Colombo</p>
                <p className="card-text-on-image font-dmSans font-light text-[12px] text-smoke mt-1">~5 hrs via A4 highway</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Train className="w-[14px] h-[14px] text-gold shrink-0 mt-1" />
              <div>
                <p className="card-heading-on-image font-dmSans font-medium text-[13px] text-cream">Train to Badulla</p>
                <p className="card-text-on-image font-dmSans font-light text-[12px] text-smoke mt-1">Then 32km drive to resort</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-mist w-full my-5" />

          <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="group flex items-center gap-2 font-jost text-[10px] text-gold uppercase hover:text-gold-light transition-colors duration-300">
            Get Directions <ArrowUpRight className="w-[14px] h-[14px]" />
          </a>
        </motion.div>
      </div>


      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="w-[1px] h-10 overflow-hidden">
          <div className="w-full h-full bg-mist animate-[lineToBottom_2s_ease-in-out_infinite]" />
        </div>
        <span className="font-jost text-[9px] text-fog tracking-[0.4em] uppercase">EXPLORE NEARBY</span>
      </div>

      <style>{`
        @keyframes lineToBottom {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
};

const StatsCounter = ({ number, label }: { number: string; label: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col gap-1"
    >
      <span className="card-heading-on-image font-cormorant text-[36px] text-gold leading-none">{number}</span>
      <span className="card-text-on-image font-jost text-[9px] text-fog uppercase">{label}</span>
    </motion.div>
  );
};

const Part2Attractions = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll('.word-reveal'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
            }
          }
        );
      }
    }, headerRef);
    return () => ctx.revert();
  }, []);

  const attractions = [
    {
      badge: "36 KM AWAY",
      category: "ICONIC LANDMARK",
      title: "Nine Arch Bridge",
      location: "Ella, Badulla District",
      desc: "One of Sri Lanka's most photographed landmarks. A colonial-era stone railway viaduct surrounded by jungle and mist.",
      image: "/images/ninearch.png"
    },
    {
      badge: "46 KM AWAY",
      category: "NATIONAL PARK",
      title: "Horton Plains",
      location: "Nuwara Eliya District",
      desc: "A UNESCO World Heritage Site featuring dramatic cliffs, cloud forests, and Sri Lanka's highest plateau at 2,100m.",
      image: "/images/hort.png"
    },
    {
      badge: "NEARBY",
      category: "NATURAL WONDER",
      title: "Bambarakanda Falls",
      location: "Kalupahana, Badulla",
      desc: "Sri Lanka's tallest waterfall at 263 metres, surrounded by pine forests and mist — a short scenic drive from A'Lankaa.",
      image: "/images/bamba.png"
    },
    {
      badge: "40 KM AWAY",
      category: "HIKING & VIEWS",
      title: "Ella Rock",
      location: "Ella, Badulla",
      desc: "One of Sri Lanka's finest hikes — rewarding trekkers with 360° views of tea country, jungle valleys, and the ocean on clear days.",
      image: "/images/ella.png"
    }
  ];

  return (
    <section className="bg-obsidian py-[80px] lg:py-[120px] px-[32px] lg:px-[80px]">
      <div className="max-w-[1440px] mx-auto">

        {/* header */}
        <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <div>
            <p className="font-jost text-[10px] text-gold uppercase tracking-[0.4em] mb-6">
              DISCOVER THE REGION
            </p>
            <h2 className="font-cormorant text-[clamp(36px,4vw,60px)] text-ivory font-light leading-tight">
              <div className="overflow-hidden"><span className="inline-block word-reveal">Beyond the resort,</span></div>
              <div className="overflow-hidden"><span className="inline-block word-reveal">adventure awaits.</span></div>
            </h2>
          </div>
          <div>
            <p className="font-dmSans text-[15px] text-smoke leading-[1.9] font-light max-w-[500px]">
              A'Lankaa sits at the heart of Sri Lanka's most spectacular highland region. From ancient bridges to national parks — extraordinary experiences surround you in every direction.
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-mist my-[64px]" />

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
          {attractions.map((attr, idx) => (
            <motion.div
              key={attr.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              viewport={{ once: true, margin: '-10%' }}
              className="relative h-[360px] lg:h-[480px] overflow-hidden group border border-transparent hover:border-gold/40 transition-colors duration-500"
            >
              <img
                src={attr.image}
                alt={attr.title}
                className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent bottom-0 h-full pointer-events-none" />

              <div className="absolute top-6 left-6 inline-block bg-gold px-[14px] py-[6px] font-jost text-[9px] text-void tracking-[0.15em] font-medium z-10 transition-transform duration-500 group-hover:scale-105">
                {attr.badge}
              </div>

              <div className="absolute inset-x-8 bottom-10 z-10 flex flex-col justify-end transition-transform duration-500 group-hover:-translate-y-2">
                <span className="gold-label-on-image font-jost text-[9px] text-gold uppercase tracking-[0.2em] mb-2">
                  {attr.category}
                </span>
                <h3 className="card-heading-on-image font-cormorant text-[clamp(28px,3vw,40px)] text-ivory font-light leading-none">
                  {attr.title}
                </h3>
                <p className="card-text-on-image font-dmSans font-light text-[12px] text-smoke/90 mt-1">
                  {attr.location}
                </p>

                <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-700 mt-0 group-hover:mt-3">
                  <p className="card-text-on-image font-dmSans font-light text-[13px] text-smoke/80 leading-relaxed mb-3">
                    {attr.desc}
                  </p>
                  <a href="#" className="gold-label-on-image font-jost text-[10px] text-gold hover:text-gold-light inline-block relative after:content-[''] after:absolute after:w-0 after:h-px after:bottom-0 after:left-0 after:bg-gold-light hover:after:w-full after:transition-all after:duration-300">
                    Learn More →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* explore more button ---------------------------- */}

        <div className="mt-16 lg:mt-20 flex justify-center" data-aos="fade-up">
          <button 
            onClick={() => navigate('/places')}
            className="font-jost text-[11px] text-ivory border border-gold/40 px-10 py-4 uppercase tracking-widest hover:bg-gold hover:border-gold hover:text-void transition-colors duration-300 inline-flex items-center gap-3">
            Explore More Places <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
};

const Part3Timeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, scaleY: 0 },
        {
          scaleX: window.innerWidth >= 768 ? 1 : 0,
          scaleY: window.innerWidth < 768 ? 1 : 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
          }
        }
      );
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { icon: Plane, title: "Bandaranaike Airport", detail: "Colombo, Sri Lanka", badge: "START" },
    { icon: Car, title: "Colombo to Badulla", detail: "Via A4 Highway", badge: "~5 hours" },
    { icon: MapPin, title: "Badulla City", detail: "Uva Province", badge: "32km left" },
    { icon: Star, title: "A'Lankaa Resorts & Spa", detail: "Haldummulla · 1,200m ASL", badge: "ARRIVED ✦", isFinal: true }
  ];

  return (
    <section className="bg-void py-[80px] px-[32px] lg:px-[80px] border-y border-gold/10">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="font-jost text-[16px] text-gold text-center uppercase tracking-[0.4em] mb-14">
          YOUR JOURNEY TO A'LANKAA
        </h2>

        <div ref={timelineRef} className="relative mt-8 md:mt-14 w-full h-[400px] md:h-auto flex flex-col md:flex-row justify-between pl-8 md:pl-0">

          {/* timeline connect */}
          <div
            ref={lineRef}
            className="absolute top-0 bottom-0 left-[23px] w-[1px] md:top-[24px] md:bottom-auto md:left-[10%] md:right-[10%] md:w-auto md:h-[1px] origin-top md:origin-left"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(184,150,90,0.4) 20%, rgba(184,150,90,0.8) 50%, rgba(184,150,90,0.4) 80%, transparent)'
            }}
          />

          <style>{`
            @media (max-width: 767px) {
              .journey-line { background: linear-gradient(to bottom, transparent, rgba(184,150,90,0.4) 20%, rgba(184,150,90,0.8) 50%, rgba(184,150,90,0.4) 80%, transparent) !important; }
            }
          `}</style>
          <div
            className="journey-line absolute top-0 bottom-0 left-[23px] w-[1px] md:hidden"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(184,150,90,0.4) 20%, rgba(184,150,90,0.8) 50%, rgba(184,150,90,0.4) 80%, transparent)'
            }}
          />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.2 }}
                viewport={{ once: true, margin: '-10%' }}
                className="relative z-10 flex flex-row md:flex-col items-center group h-full md:h-auto gap-6 md:gap-0 w-full md:w-auto"
              >
                {/* node */}
                <div className={`w-[60px] h-[60px] rounded-full border border-gold flex items-center justify-center transition-all duration-500
                  ${step.isFinal ? 'bg-gold shadow-[0_0_30px_rgba(184,150,90,0.5)]' : 'bg-void group-hover:shadow-[0_0_20px_rgba(184,150,90,0.3)]'}`}
                >
                  <Icon className={`w-[24px] h-[24px] ${step.isFinal ? 'text-void' : 'text-gold'}`} strokeWidth={1.5} />
                </div>


                <div className="hidden md:block absolute top-[24px] right-[-50%] w-[12px] h-[12px] text-gold/50 font-jost text-[14px]">
                  {idx < steps.length - 1 && '›'}
                </div>

                {/* cont */}
                <div className="mt-0 md:mt-4 text-left md:text-center w-[200px]">
                  <p className="font-dmSans font-medium text-[14px] text-cream">{step.title}</p>
                  <p className="font-dmSans font-light text-[12px] text-smoke mt-1">{step.detail}</p>
                  <div className="inline-block mt-3 px-3 py-1 bg-gold/10 rounded-sm">
                    <span className="font-jost text-[10px] text-gold font-medium uppercase tracking-wider">{step.badge}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const LocationShowcase = () => {
  return (
    <>
      <Part1Hero />
      <Part2Attractions />
      <Part3Timeline />
    </>
  );
};
