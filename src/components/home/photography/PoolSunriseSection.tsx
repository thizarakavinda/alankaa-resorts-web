import { ArrowRight } from 'lucide-react';

const PoolSunriseSection = () => {
  return (
    <section className="h-[200vh] md:h-[110vh] bg-void flex flex-col md:flex-row w-full overflow-hidden">
      {/* Pool Split */}
      <div className="relative h-[100vh] md:h-full flex-1 group hover:flex-[1.4] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden border-r border-gold/20">
        <img src="/images/pool view.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[15s] opacity-70" alt="Infinity Pool" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        
        {/* Modern Centered Layout */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 z-10 w-full max-w-[600px] mx-auto">
          <span className="gold-label-on-image font-jost text-[10px] text-gold uppercase tracking-[0.5em] mb-6 transition-transform duration-500 group-hover:-translate-y-2">Pool Experience</span>
          
          <h2 className="section-heading-on-image font-cormorant text-[clamp(42px,5vw,80px)] text-ivory font-light leading-[1.0] mb-8 transition-transform duration-500 delay-75 group-hover:-translate-y-2">
            Swim above<br />the clouds.
          </h2>
          
          <div className="section-subtext-on-image font-dmSans text-[14px] text-smoke leading-relaxed sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 delay-150 transform sm:translate-y-4 sm:group-hover:translate-y-0 flex flex-col items-center">
            <p className="tracking-wide">Infinity pool · Heated pool · Kids pool</p>
            <p className="mt-2 text-fog">Open 6:00 AM – 10:00 PM daily</p>
            <button className="hero-btn-secondary text-ivory bg-gold/10 border border-gold/30 px-8 py-3 font-jost text-[11px] uppercase tracking-widest mt-8 flex items-center gap-3 hover:bg-gold hover:text-void transition-colors duration-300">
              Explore Pool <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Internal diamond divider */}
      <div className="hidden md:flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2 h-full z-20 pointer-events-none mix-blend-screen">
        <div className="w-[1px] h-[30%] bg-gold/50" />
        <div className="w-[8px] h-[8px] border border-gold rotate-45 my-4 flex items-center justify-center bg-void">
            <div className="w-[2px] h-[2px] bg-ivory" />
        </div>
        <div className="w-[1px] h-[30%] bg-gold/50" />
      </div>

      {/* Sunrise Split */}
      <div className="relative h-[100vh] md:h-full flex-1 group hover:flex-[1.4] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden">
        <img src="/images/Sunrise View Suite 16.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[15s] opacity-70" alt="Sunrise Views" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        
        {/* Modern Centered Layout */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 z-10 w-full max-w-[600px] mx-auto">
           <span className="gold-label-on-image font-jost text-[10px] text-gold uppercase tracking-[0.5em] mb-6 transition-transform duration-500 group-hover:-translate-y-2">Sunrise Experience</span>
          
          <h2 className="section-heading-on-image font-cormorant text-[clamp(42px,5vw,80px)] text-ivory font-light leading-[1.0] mb-8 transition-transform duration-500 delay-75 group-hover:-translate-y-2">
            Wake up inside<br />the sunrise.
          </h2>
          
          <div className="section-subtext-on-image font-dmSans text-[14px] text-smoke leading-relaxed sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 delay-150 transform sm:translate-y-4 sm:group-hover:translate-y-0 flex flex-col items-center">
            <p className="tracking-wide">Indrajith Sunrise Suite · Private viewpoint</p>
            <p className="mt-2 text-fog">Daily from 5:30 AM</p>
            <button className="hero-btn-secondary text-ivory bg-gold/10 border border-gold/30 px-8 py-3 font-jost text-[11px] uppercase tracking-widest mt-8 flex items-center gap-3 hover:bg-gold hover:text-void transition-colors duration-300">
               Experience Sunrise <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoolSunriseSection;
