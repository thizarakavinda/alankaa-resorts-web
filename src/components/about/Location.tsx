import { CarFront, Train, Mountain, Plane } from 'lucide-react';

export const Location = () => {
  return (
    <section className="bg-obsidian py-24 lg:py-[120px] px-8 lg:px-[80px]">
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        
        {/* LEFT: Map Placeholder */}
        <div className="relative w-full h-[500px] bg-void border border-mist overflow-hidden flex items-center justify-center">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-10" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
              backgroundSize: '40px 40px' 
            }} 
          />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Pulsing Dot */}
            <div className="relative flex h-4 w-4 mb-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-gold shadow-[0_0_20px_rgba(184,150,90,0.5)]"></span>
            </div>
            
            <div className="bg-charcoal/80 backdrop-blur-sm border border-gold/20 p-4 rounded text-center">
              <p className="font-dmSans font-medium text-[16px] text-cream mb-1">A'Lankaa Resorts & Spa</p>
              <p className="font-dmSans text-[13px] text-smoke">Haldummulla, Badulla</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Content */}
        <div>
          <h2 className="font-cormorant text-[clamp(32px,4vw,48px)] text-ivory font-light mb-10">
            How to Find Us
          </h2>

          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4 group cursor-default">
              <CarFront className="w-5 h-5 text-gold stroke-[1.5] transition-transform duration-500 group-hover:-translate-y-1" />
              <p className="font-dmSans font-light tracking-wide text-[15px] text-smoke/90">32km from Badulla City</p>
            </div>
            <div className="flex items-center gap-4 group cursor-default">
              <Train className="w-5 h-5 text-gold stroke-[1.5] transition-transform duration-500 group-hover:-translate-y-1" />
              <p className="font-dmSans font-light tracking-wide text-[15px] text-smoke/90">36km from Nine Arch Bridge, Ella</p>
            </div>
            <div className="flex items-center gap-4 group cursor-default">
              <Mountain className="w-5 h-5 text-gold stroke-[1.5] transition-transform duration-500 group-hover:-translate-y-1" />
              <p className="font-dmSans font-light tracking-wide text-[15px] text-smoke/90">46km from Horton Plains National Park</p>
            </div>
            <div className="flex items-center gap-4 group cursor-default">
              <Plane className="w-5 h-5 text-gold stroke-[1.5] transition-transform duration-500 group-hover:-translate-y-1" />
              <p className="font-dmSans font-light tracking-wide text-[15px] text-smoke/90">~60mi from Mattala Rajapaksa Airport</p>
            </div>
          </div>

          <div className="mb-10">
            <h4 className="font-jost text-[10px] text-gold tracking-widest uppercase mb-3">
              Address
            </h4>
            <address className="font-dmSans font-light text-[15px] text-smoke/90 not-italic leading-[2] tracking-wide">
              A'Lankaa Resorts & Spa<br />
              1000m Summit Road<br />
              Haldummulla, Badulla District<br />
              Sri Lanka
            </address>
          </div>

          <button className="inline-flex items-center justify-center font-jost text-[11px] uppercase tracking-[0.2em] text-gold border border-gold/40 px-8 py-4 hover:border-gold hover:bg-gold/5 transition-colors duration-500 group">
            Open in Google Maps <span className="ml-2 relative group-hover:translate-x-1 transition-transform duration-500">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
