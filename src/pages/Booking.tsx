import { useEffect } from 'react';
import { motion } from 'framer-motion';
import BookingHero from '../components/booking/BookingHero';
import BeBookingForm from "../components/beForms/BeBookingForm.tsx";

const Booking = () => {
  useEffect(() => {
    document.title = "Online reservation A'Lankaa Resorts & Spa, Badulla - Official site";
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
      <BeBookingForm />
    </motion.main>
  );
};

export default Booking;
