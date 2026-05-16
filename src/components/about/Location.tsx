import { CarFront, Train, Mountain } from 'lucide-react';

export const Location = () => {
  return (
    <section className="bg-obsidian py-24 lg:py-[120px] px-8 lg:px-[80px]">
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* actual map embed */}
        <div className="relative w-full h-[500px] border border-mist overflow-hidden shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.1238766811343!2d80.87856239999999!3d6.754744499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae47716d84e3dcd%3A0xf107acadc6ee0026!2sA&#39;Lankaa%20Resorts%20%26%20Spa!5e0!3m2!1sen!2slk!4v1778145566198!5m2!1sen!2slk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="A'Lankaa Resorts & Spa Location"
            className="filter grayscale-[0.2] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
          ></iframe>
        </div>

        {/* rght cont */}
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
          </div>

          <div className="mb-10">
            <h4 className="font-jost text-[10px] text-gold tracking-widest uppercase mb-3">
              Address
            </h4>
            <address className="font-dmSans font-light text-[15px] text-smoke/90 not-italic leading-[2] tracking-wide">
              A'Lankaa Resorts & Spa<br />
              1200m Summit Road<br />
              Haldummulla, Badulla District<br />
              Sri Lanka
            </address>
          </div>

          <a href="https://maps.app.goo.gl/gaGG4TwbFk1GKapa9"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center font-jost text-[11px] uppercase tracking-[0.2em] text-gold border border-gold/40 px-8 py-4 hover:border-gold hover:bg-gold/5 transition-colors duration-500 group"
          >
            Open in Google Maps
            <span className="ml-2 relative group-hover:translate-x-1 transition-transform duration-500">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
