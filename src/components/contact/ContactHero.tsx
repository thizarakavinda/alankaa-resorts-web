import { motion } from 'framer-motion';

const ContactHero = () => {
  return (
    <section className="relative w-full h-[60vh] flex items-end">
      {/* back img */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?q=80&w=2600&auto=format&fit=crop')" }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-transparent" />
      </div>

      {/* cont */}
      <div className="relative z-10 w-full px-[80px] pb-[80px] max-md:px-6 max-md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="block font-jost text-[12px] uppercase tracking-[0.2em] text-gold mb-4">
            Reach Out
          </span>
          <h1 className="font-cormorant text-5xl md:text-7xl text-ivory mb-6">
            Contact Us
          </h1>
          <p className="font-dmSans text-[16px] text-cream/90 max-w-md leading-relaxed">
            We're available 24 hours a day, 7 days a week.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;
