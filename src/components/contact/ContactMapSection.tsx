import { MapPin } from 'lucide-react';

const ContactMapSection = () => {
  return (
    <section className="w-full h-[500px] relative overflow-hidden bg-charcoal">

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* center map */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
        {/* Floating Card */}
        <div className="bg-white px-6 py-4 rounded-sm shadow-xl mb-4 text-center">
          <h4 className="font-cormorant font-semibold text-void text-lg mb-1">A'Lankaa Resorts & Spa</h4>
          <p className="font-dmSans text-[12px] text-charcoal/70">Haldummulla, Badulla</p>
        </div>


        <div className="relative">
          <MapPin className="w-10 h-10 text-gold relative z-10" fill="var(--clr-void)" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gold/20 rounded-full animate-ping z-0" />
        </div>
      </div>

      {/* embabed location link */}
      <div className="absolute bottom-6 right-6 z-20">
        <a
          href="https://maps.google.com/?q=Haldummulla,Badulla"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-jost text-[12px] uppercase tracking-[0.1em] text-gold border border-gold px-6 py-3 hover:bg-gold hover:text-void transition-colors duration-300 bg-void/50 backdrop-blur-sm"
        >
          Open in Google Maps <span>→</span>
        </a>
      </div>
    </section>
  );
};

export default ContactMapSection;
