import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const FloatingBookBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-10 right-10 z-[998] flex flex-col items-center gap-4 group"
        >
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/94707975975"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 shadow-lg hover:scale-110"
          >
            <FaWhatsapp size={24} />
          </a>

          {/* Main Book Now Button */}
          <Link
            to="/booking"
            className="relative flex items-center justify-center h-16 bg-gold rounded-full shadow-[0_8px_32px_rgba(184,150,90,0.3)] transition-all duration-300 w-16 group-hover:w-[130px]"
          >
            <span className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
              <Calendar size={20} className="text-void" />
            </span>
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-jost text-[11px] text-void uppercase tracking-widest whitespace-nowrap">
              Book Now
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
