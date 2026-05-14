import { Waves, Flower2, Utensils, MountainSnow, Car, Coffee, Dumbbell, Bath } from 'lucide-react';
import { motion } from 'framer-motion';

const amenities = [
  { icon: Waves, label: "Infinity Pool" },
  { icon: Flower2, label: "Spa & Wellness" },
  { icon: Utensils, label: "Restaurant" },
  { icon: MountainSnow, label: "Mountain Views" },
  { icon: Car, label: "Free Parking" },
  { icon: Coffee, label: "Breakfast Included" },
  { icon: Dumbbell, label: "Fitness" },
  { icon: Bath, label: "Jacuzzi Suites" },
];

const BookingAmenities = () => {
  // Duplicate array to ensure smooth continuous scrolling
  const repeatedAmenities = [...amenities, ...amenities, ...amenities, ...amenities];

  return (
    <section className="bg-obsidian border-y border-mist py-[40px] overflow-hidden relative flex">
      <div className="absolute inset-y-0 left-0 w-[40px] md:w-[100px] bg-gradient-to-r from-obsidian to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[40px] md:w-[100px] bg-gradient-to-l from-obsidian to-transparent z-10 pointer-events-none" />

      <motion.div 
        className="flex items-center gap-[48px] min-w-max pr-[48px]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
      >
        {repeatedAmenities.map((Am, i) => (
          <div key={i} className="flex items-center gap-3">
            <Am.icon className="w-8 h-8 text-gold shrink-0" strokeWidth={1.5} />
            <span className="font-jost text-[14px] uppercase tracking-[0.15em] text-fog whitespace-nowrap">
              {Am.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default BookingAmenities;
