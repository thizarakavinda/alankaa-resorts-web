import { motion } from 'framer-motion';

const images = [
  "/images/room hero.png", // 0
  "/images/sky view.jpg", // 1
  "/images/kandiyan 1.jpg", // 2
  "/images/rock 2.jpg", // 3
  "/images/kandiyan 2.jpg"  // 4
];

const container: any = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const item: any = {
  hidden: { scale: 0.95, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: "easeOut" } }
};

const GalleryHero = () => {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden bg-void">
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="absolute inset-0 w-full h-full grid grid-cols-2 md:grid-cols-3 grid-rows-4 md:grid-rows-2 gap-1 md:gap-0"
      >
        {/* left cell */}
        <motion.div variants={item} className="col-span-2 md:col-span-1 row-span-2 relative overflow-hidden bg-charcoal">
          <img src={images[0]} alt="Gallery feature 1" className="w-full h-full object-cover" />
        </motion.div>

        {/* right cell */}
        <motion.div variants={item} className="col-span-2 row-span-1 relative overflow-hidden bg-charcoal hidden md:block">
          <img src={images[1]} alt="Gallery feature 2" className="w-full h-full object-cover" />
        </motion.div>

        {/* middle cell */}
        <motion.div variants={item} className="col-span-1 row-span-1 relative overflow-hidden bg-charcoal">
          <img src={images[2]} alt="Gallery feature 3" className="w-full h-full object-cover" />
        </motion.div>

        {/* bottom right cell */}
        <motion.div variants={item} className="col-span-1 row-span-1 relative overflow-hidden bg-charcoal">
          <img src={images[3]} alt="Gallery feature 4" className="w-full h-full object-cover" />
        </motion.div>

        
        <motion.div variants={item} className="col-span-2 row-span-1 relative overflow-hidden bg-charcoal md:hidden">
          <img src={images[1]} alt="Gallery feature 2 mobile" className="w-full h-full object-cover" />
        </motion.div>
      </motion.div>

      
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* cont */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-center text-center z-10 pointer-events-none">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="block font-jost text-[12px] uppercase tracking-[0.2em] text-gold mb-4 hero-label-on-image"
        >
          Visual Journey
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="font-cormorant text-5xl md:text-7xl text-ivory mb-6 hero-headline-on-image"
        >
          The Gallery
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="font-dmSans text-[16px] text-cream/90 hero-subtext-on-image"
        >
          Every image, a window into A'Lankaa.
        </motion.p>
      </div>
    </section>
  );
};

export default GalleryHero;
