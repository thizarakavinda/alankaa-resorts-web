import { useEffect } from 'react';
import { motion } from 'framer-motion';
import BookingHero from '../components/booking/BookingHero';
import BookingInterface from '../components/booking/BookingInterface';
import BookingBenefits from '../components/booking/BookingBenefits';
import BookingAmenities from '../components/booking/BookingAmenities';

const Booking = () => {
  useEffect(() => {
    document.title = "Reservations | A'Lankaa Resorts & Spa";
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-void min-h-screen"
    >
      <BookingHero />
      <BookingInterface />
      <BookingBenefits />
      <BookingAmenities />
    </motion.main>
  );
};

export default Booking;
