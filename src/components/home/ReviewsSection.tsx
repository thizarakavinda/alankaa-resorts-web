import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const reviews = [
  {
    initials: 'SS',
    name: 'S. Skandakumar',
    title: 'Former Group Chairman George Steuarts • Former High Commissioner to Australia • Feb 2022',
    text: '“We took the turn at a crowded Haldumulla junction. Within five minutes we arrived at A‘Lankaa Hotel, and walked into a truly different world ! Adorned by innovative architecture with a touch of Bali, a wide spacious foyer tastefully furnished, complimented by attentive and courteous staff, we then proceeded on a tour of the hotel.”',
  },
  {
    initials: 'NM',
    name: 'Nalaka and Kamini Mendis',
    title: 'Professors Emeritus, University of Colombo • Feb 2022',
    text: '“Our impressions of the visit to A’Lankaa Resort in Haldumulla. A friend took us to this resort on the 3rd February, and within minutes of entering the lobby of the hotel we confronted a breathtaking view of the Haldumulla valley with and expansive dense forest cover below and an array of southern hills in the far background stretching towards the southern coast.”',
  },
  {
    initials: 'SK',
    name: 'S. Skandakumar',
    title: 'Former Group Chairman, George Steuarts • Former High Commissioner to Australia • Feb 2022',
    text: '“We walked into a truly different world! Adorned by innovative architecture with a touch of Bali... breathtaking views from almost every angle. We were then hosted to a sumptuous Sri Lankan lunch in a restaurant whose ambience was breathtaking and the view equally alluring.”',
  },
  {
    initials: 'NM',
    name: 'Prof. Nalaka & Kamini Mendis',
    title: 'Professors Emeritus, University of Colombo • Feb 2022',
    text: '“Discovering this magnificent hotel amidst the wilderness of Haldumulla was an exciting experience indeed... The bedrooms are tastefully designed for comfort — in fact mini suites equipped with every possible convenience including a jacuzzi bath. We recommend this resort to the discerning visitor looking for a peaceful and pleasant stay amidst spectacular scenery.”',
  },
  {
    initials: 'JN',
    name: 'Bishop J. Alan Neal',
    title: 'Germany • Aug 2019',
    text: '“After travelling the World — this is clearly one of the most beautiful hotels I\'ve visited. God Bless.”',
  },
  {
    initials: 'SH',
    name: 'S. Hettiarachchi',
    title: 'Secretary, Ministry of Tourism • Sep 2019',
    text: '“I didn\'t expect such a fantastic product in this remote area. As Secretary, Ministry of Tourism, I encourage this type of new visionary product and give our fullest support to enhance their visionary expectation.”',
  },
  {
    initials: 'SM',
    name: 'S. Mascarenhas',
    title: 'Chairman, Northern Tourism Bureau',
    text: '“If anyone is searching for heaven, this is where you should be. The clouds, mist and most of all rainy clouds come into the room and touch you. Nowhere in Sri Lanka do you experience this. The food, staff and amenities are exceptional.”',
  }
];

export const ReviewsSection = () => {
  return (
    <section className="py-32 px-6 md:px-20 bg-void relative overflow-hidden">
      {/* elements */}
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent opacity-50" />
      <div className="absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent opacity-50" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <span className="font-jost text-[10px] text-gold uppercase tracking-[0.3em] mb-4 block">
            Guest Experiences
          </span>
          <h2 className="font-cormorant text-[40px] md:text-[56px] text-ivory mb-6 leading-none">
            Voices of Our Guests
          </h2>
          <div className="w-12 h-px bg-gold/50 mx-auto" />
        </div>

        {/* slider */}
        <div className="flex flex-nowrap overflow-x-auto gap-6 pb-12 snap-x snap-mandatory w-full hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="w-[85vw] md:w-[600px] shrink-0 snap-center md:snap-start h-full"
            >
              <div
                className="bg-obsidian border border-white/5 hover:border-gold/30 p-8 md:p-10 md:px-14 relative group transition-all duration-500 rounded-sm h-[400px] flex flex-col hide-scrollbar overflow-y-auto"
                style={{ scrollbarWidth: 'none' }}
              >
                <Quote
                  className="absolute top-8 right-8 w-12 h-12 text-white/5 group-hover:text-gold/10 transition-colors duration-500 transform -scale-x-100"
                  strokeWidth={1}
                />


                <div className="flex items-center gap-5 border-t border-white/5 pt-6 group-hover:border-gold/20 transition-colors duration-500 mt-auto shrink-0">
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center font-jost font-medium text-[14px] bg-charcoal text-gold border border-gold/20 rounded-full">
                    {review.initials}
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-dmSans font-medium text-ivory text-[16px] tracking-wide mb-1">
                      {review.name}
                    </h3>
                    <p className="font-jost text-[11px] text-smoke/70 uppercase tracking-widest leading-snug">
                      {review.title}
                    </p>
                  </div>
                </div>
                <br />
                <hr className="border-t border-white/5 group-hover:border-gold/20 transition-colors duration-500 mt-auto shrink-0" />

                <p className="font-cormorant italic text-[20px] md:text-[24px] text-cream leading-relaxed mb-10 relative z-10 pr-6 pt-4">
                  {review.text}
                </p>









              </div>
            </motion.div>
          ))}
          <div className="w-[40px] shrink-0 pointer-events-none" />
        </div>

        <div className="flex justify-center mt-4">
          <span className="font-jost text-[9px] text-fog tracking-[0.3em] uppercase animate-pulse">
            ← Drag to Explore →
          </span>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
