import { motion } from 'framer-motion';

const GalleryDrone = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] bg-charcoal overflow-hidden border-t border-[rgba(255,255,255,0.03)] flex flex-col items-center justify-center">
      {/* back imgs */}
      <img
        src="images/view 6.jpg"
        alt="Aerial Drone perspective"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[rgba(8,8,8,0.5)]" />

      {/* cont */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="font-jost text-[10px] text-gold uppercase tracking-[0.2em] mb-6 hero-label-on-image"
        >
          Aerial Perspective
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-cormorant text-4xl md:text-6xl text-ivory mb-10 leading-tight hero-headline-on-image"
        >
          1,000 metres of <br className="hidden md:block" />
          pure perspective.
        </motion.h2>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="px-10 py-4 border border-[rgba(184,150,90,0.6)] text-gold font-dmSans text-[12px] uppercase tracking-widest hover:bg-gold hover:text-void transition-colors duration-300"
        >
          View Full Film
        </motion.button>
      </div>
    </section>
  );
};

export default GalleryDrone;
