import { Trophy, Star, Leaf, Award } from 'lucide-react';

const awards = [
  {
    icon: Trophy,
    name: "Travellers' Choice",
    source: "TripAdvisor"
  },
  {
    icon: Star,
    name: "Guest Favourite 2024",
    source: "Booking.com"
  },
  {
    icon: Leaf,
    name: "Gold Circle Resort",
    source: "Agoda"
  },
  {
    icon: Award,
    name: "Certified",
    source: "Sri Lanka Tourism Board"
  }
];

export const Awards = () => {
  return (
    <section className="bg-charcoal py-[64px] px-8 lg:px-[80px] border-y border-mist relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto w-full">
        <h2 className="font-cormorant text-[32px] text-center text-ivory mb-12 font-light">
          Recognition
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-evenly gap-10 md:gap-4 flex-wrap">
          {awards.map((award, idx) => {
            const Icon = award.icon;
            return (
              <div 
                key={idx}
                className="group relative flex flex-col items-center text-center px-4 py-2"
              >
                {/* Visual Shimmer Layer for hover */}
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent -translate-x-[150%] skew-x-[-20deg] opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_infinite]" />

                <Icon className="w-8 h-8 text-gold stroke-[1.5] mb-4 relative z-10" />
                <h4 className="font-dmSans font-medium text-[13px] text-cream mb-1 relative z-10">
                  {award.name}
                </h4>
                <p className="font-jost text-[10px] text-gold uppercase tracking-widest relative z-10">
                  {award.source}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Inline styles for custom shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }
      `}</style>
    </section>
  );
};
