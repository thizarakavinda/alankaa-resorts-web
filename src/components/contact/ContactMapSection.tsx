
const ContactMapSection = () => {
  return (
    <section className="w-full h-[500px] relative overflow-hidden bg-charcoal">

      <div className="absolute inset-0 z-10">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.1238766811343!2d80.87856239999999!3d6.754744499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae47716d84e3dcd%3A0xf107acadc6ee0026!2sA&#39;Lankaa%20Resorts%20%26%20Spa!5e0!3m2!1sen!2slk!4v1778145566198!5m2!1sen!2slk" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="A'Lankaa Resorts & Spa Location"
          className="filter grayscale-[0.3] contrast-[1.1] brightness-[0.9] hover:grayscale-0 hover:brightness-100 transition-all duration-700"
        ></iframe>
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
