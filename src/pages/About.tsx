import { motion } from 'framer-motion';
import { Hero } from '../components/about/Hero';
import { OriginStory } from '../components/about/OriginStory';
import { Philosophy } from '../components/about/Philosophy';
import { Timeline } from '../components/about/Timeline';

import { Awards } from '../components/about/Awards';
import { Location } from '../components/about/Location';
import BeSearchFormMobile from "../components/beForms/BeSearchFormMobile.tsx";

export const About = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
      className="bg-void min-h-screen" 
    >
      <Hero />
      <BeSearchFormMobile />
      <OriginStory />
      <Philosophy />
      <Timeline />
      {/* <Team /> */}
      <Awards />
      <Location />
    </motion.main>
  );
};


