import { motion } from 'framer-motion';

const BookingHero = () => {
  return (
    <section className="relative w-full h-[50vh] flex items-center justify-center">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/book now cover.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#080808]/70" />
      </div>

      <div className="relative z-10 w-full px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="block font-jost text-[12px] uppercase tracking-[0.2em] text-gold mb-4 hero-label-on-image">
            Reservations
          </span>
          <h1 className="font-cormorant text-5xl md:text-6xl text-ivory mb-6 hero-headline-on-image">
            Reserve Your Escape
          </h1>
          <p className="font-dmSans text-[16px] text-cream/90 hero-subtext-on-image">
            No payment required · Free cancellation · Confirmation within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingHero;
