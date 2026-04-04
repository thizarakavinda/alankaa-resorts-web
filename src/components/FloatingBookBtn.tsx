import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
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
          className="fixed bottom-10 right-10 z-[998]"
        >
          <Link
            to="/booking"
            className="group relative flex items-center justify-center w-16 h-16 bg-gold rounded-full shadow-[0_8px_32px_rgba(184,150,90,0.3)] hover:scale-105 transition-transform duration-300 hoverable"
          >
            <Calendar size={20} className="text-void" />
            
            {/* Tooltip */}
            <div className="absolute right-[120%] top-1/2 -translate-y-1/2 px-4 py-2 bg-void border border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              <span className="font-jost text-[10px] text-gold uppercase tracking-[0.15em]">Book Now</span>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
