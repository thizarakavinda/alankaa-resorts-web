import { Camera } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const CTASection = () => {
  return (
    <section className="bg-forest px-6 py-24 md:p-[120px_80px] border-t border-gold/15 relative overflow-hidden">
     
      <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/40 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(184,150,90,0.15)_0%,_transparent_60%)] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-16 md:gap-8 items-center relative z-10">
        
        <div className="w-full md:w-[60%] text-center md:text-left" data-aos="fade-right">
          <span className="font-jost text-[10px] text-gold uppercase tracking-[0.4em] block mb-6">Book Your Shoot</span>
          <h2 className="font-cormorant italic text-[clamp(36px,4vw,60px)] text-ivory font-light leading-[1.15] mb-6">
            Some backdrops are worth<br className="hidden md:block"/> travelling the world for.
          </h2>
          <p className="font-dmSans text-[15.5px] text-smoke font-light max-w-[480px] leading-relaxed mx-auto md:mx-0">
            Contact our team to plan your perfect shoot. We handle location scouting, timing, and all logistics — you just bring yourself.
          </p>
        </div>

        <div className="w-full md:w-[40%] flex flex-col gap-3 max-w-[400px] mx-auto" data-aos="fade-left" data-aos-delay="200">
           <button className="w-full bg-gold text-void font-jost text-[11px] uppercase tracking-widest py-[18px] px-8 flex items-center justify-center gap-3 hover:bg-ivory hover:-translate-y-1 transition-all duration-300 font-medium">
             <Camera size={16} /> Book a Photography Session
           </button>
           <button className="w-full bg-[#25D366]/10 border border-[#25D366]/40 text-[#25D366] font-jost text-[11px] uppercase tracking-widest py-[18px] px-8 flex items-center justify-center gap-3 hover:bg-[#25D366]/20 transition-colors duration-300 font-medium group">
             <FaWhatsapp size={16} className="group-hover:scale-110 transition-transform" /> Chat on WhatsApp
           </button>
           <p className="font-jost text-[9px] text-fog text-center mt-3 uppercase tracking-[0.2em] opacity-80">
             Our team responds within 2 hours
           </p>
        </div>

      </div>
    </section>
  );
};

export default CTASection;
