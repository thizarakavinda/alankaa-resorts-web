import { motion } from 'framer-motion';
import {useEffect} from "react";

export const PlaceholderPage = ({ title }: { title: string }) => {
  useEffect(() => {
    document.body.classList.add('page-404');
    return () => document.body.classList.remove('page-404');
  }, []);
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-void min-h-screen text-cream flex items-center justify-center pt-24"
    >
      <div className="text-center px-6">
        <h1 className="font-cormorant text-[48px] md:text-[72px] text-ivory mb-6">{title}</h1>
        <p className="font-dmSans text-[16px] text-smoke max-w-lg mx-auto">
          This is a placeholder page for {title}. Additional cinematic vertical and horizontal scrolling sections will be developed here.
        </p>
      </div>
    </motion.main>
  );
};
