import { Waves, Flower2, Utensils, MountainSnow, Car, Coffee, Dumbbell, Bath } from 'lucide-react';

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
  return (
    <section className="bg-obsidian border-y border-mist py-[40px] px-[80px] max-lg:px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-[48px] min-w-max">
          {amenities.map((Am, i) => (
            <div key={i} className="flex items-center gap-3">
              <Am.icon className="w-5 h-5 text-gold shrink-0" strokeWidth={1.5} />
              <span className="font-jost text-[10px] uppercase tracking-[0.15em] text-fog whitespace-nowrap">
                {Am.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingAmenities;
