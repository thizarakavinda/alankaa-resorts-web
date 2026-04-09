import { motion } from 'framer-motion';
import { BadgeCheck, Gift, RotateCcw, UserCircle } from 'lucide-react';

const benefits = [
  { icon: BadgeCheck, title: "Best Rate Guaranteed", desc: "The lowest available rate, always." },
  { icon: Gift, title: "Complimentary Welcome Gift", desc: "A personal welcome waiting in your room." },
  { icon: RotateCcw, title: "Free Cancellation", desc: "Plans change. We understand." },
  { icon: UserCircle, title: "Personalized Service", desc: "Tell us your preferences. We'll remember." },
];

const BookingBenefits = () => {
  return (
    <section className="py-[80px] px-[80px] max-lg:px-12 max-md:px-6" style={{ background: "var(--clr-forest, #101c15)" }}>
      <div className="max-w-[1400px] mx-auto text-center">
        <h2 className="font-cormorant text-[40px] text-ivory mb-16">
          Why Book Directly With Us?
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((B, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className="bg-white/5 border border-[rgba(184,150,90,0.1)] py-10 px-8 flex flex-col items-center text-center"
            >
              <B.icon className="w-8 h-8 text-gold mb-6" strokeWidth={1.5} />
              <h3 className="font-cormorant text-xl text-cream mb-4">{B.title}</h3>
              <p className="font-dmSans text-[14px] text-smoke leading-relaxed">{B.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingBenefits;
