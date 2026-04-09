import { motion } from 'framer-motion';
import { Hero } from '../components/about/Hero';
import { OriginStory } from '../components/about/OriginStory';
import { Philosophy } from '../components/about/Philosophy';
import { Timeline } from '../components/about/Timeline';
import { Team } from '../components/about/Team';
import { Awards } from '../components/about/Awards';
import { Location } from '../components/about/Location';

export const About = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
      className="bg-void min-h-screen pt-24" 
    >
      <Hero />
      <OriginStory />
      <Philosophy />
      <Timeline />
      <Team />
      <Awards />
      <Location />
    </motion.main>
  );
};


