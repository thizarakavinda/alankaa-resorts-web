import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, X } from 'lucide-react';

const reviews = [
  {
    initials: 'SS',
    name: 'S. Skandakumar',
    title: 'Former Group Chairman George Steuarts • Former High Commissioner to Australia • Feb 2022',
    text: "We took the turn at a crowded Haldumulla junction. Within five minutes we arrived at A‘Lankaa Hotel, and walked into a truly different world ! Adorned by innovative architecture with a touch of Bali, a wide spacious foyer tastefully furnished, complimented by attentive and courteous staff, we then proceeded on a tour of the hotel. Breathtaking views from almost every angle made the choice of bedroom a difficult one. While some faced a glorious sun rise the rest brought twilight into the room with a lingering view of the sunset. Spacious and luxurious with all modern amenities, I said to myself “ A night stay is a must “ We were then hosted to a sumptuous Sri Lankan lunch of fresh vegetables, Fish and Chicken in a restaurant whose ambience was breathtaking and the view equally alluring. An equally well designed bar beckoned but we resisted the temptation ! Instead we shared a bottle of vintage red over lunch. Thank you Vasu, My friends Dr Nalaka and Kamini found it an experience to remember as I did. Good luck and many blessings",
  },
  {
    initials: 'NM',
    name: 'Nalaka and Kamini Mendis',
    title: 'Professors Emeritus, University of Colombo • Feb 2022',
    text: "A friend took us to this resort on the 3rd February, and within minutes of entering the lobby of the hotel we confronted a breathtaking view of the Haldumulla valley with and expansive dense forest cover below and an array of southern hills in the far background stretching towards the southern coast. The resort perched far above the valley has panoramic views of the Haptulae mountain range on the left, and a deep valley below leading into the uda walawe area and beyond to the Indian ocean. The building is designed to capture these great views at different levels from the restaurant, other open areas and the bed rooms. The bed rooms are tastefully designed for comfort, they are in fact mini suites equipped with every possible convenience including a jacuzzi bath in each. The staff, all of whom we found were locals, were exceptionally warm and friendly. We were hosted to a delicious lunch by the owner and if this was a taste of food in this hotel, it is yet another aspect that visitors could look forward to. The public areas are intricately designed with detailed carved wood work and an abundance of plants. A swimming pool and a fully equipped gymnasium are also features of this hotel. Discovering this magnificent hotel amidst the wilderness of Haldumulla was an exciting experience indeed, which we will remember for a long time to come. We recommend this resort to the discerning visitor looking for a peaceful, and pleasant stay in comfort, amidst spectacular scenery.",
  },
  {
    initials: 'SM',
    name: 'S. Mascarenhas',
    title: 'Chairman, Northern Tourism Bureau',
    text: "If anyone is searching for heaven, this is where you should be. The clouds, mist & most of all rainy clouds come into the room & touches you. No where in Sri Lanka do you experience this. Also, the food, staff & amenities are exceptional. Thank you for the wonderful service. All the best Mr Vasu & hope to see you soon",
  },
  {
    initials: 'SH',
    name: 'S. Hettiarachchi',
    title: 'Secretary, Ministry of Tourism • Sep 2019',
    text: '"I didn\'t expect such a fantastic product in this remote area. As Secretary, Ministry of Tourism, I encourage this type of new visionary product and give our fullest support to enhance their visionary expectation."',
  },
  {
    initials: 'JN',
    name: 'Bishop J. Alan Neal',
    title: 'Germany • Aug 2019',
    text: '"After travelling the World \u2014 this is clearly one of the most beautiful hotels I\'ve visited. God Bless."',
  },
];

// Approximate char count for 5 lines at card width
const MAX_CHARS = 220;

export const ReviewsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeReview, setActiveReview] = useState<typeof reviews[0] | null>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <section className="py-32 px-6 md:px-20 bg-void relative overflow-hidden">
      {/* decorative lines */}
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent opacity-50" />
      <div className="absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent opacity-50" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* header */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="font-jost text-[13px] text-gold uppercase tracking-[0.3em] mb-4 block">
            Guest Experiences
          </span>
          <h2 className="font-cormorant text-[40px] md:text-[56px] text-ivory mb-6 leading-none">
            Voices of Our Guests
          </h2>
          <div className="w-12 h-px bg-gold/50 mx-auto" />
        </div>

        {/* carousel wrapper */}
        <div className="relative">

          {/* left arrow */}
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll reviews left"
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full border border-gold/30 bg-void/80 backdrop-blur-sm text-gold hover:bg-gold hover:text-void transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* right arrow */}
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll reviews right"
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full border border-gold/30 bg-void/80 backdrop-blur-sm text-gold hover:bg-gold hover:text-void transition-all duration-300 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* scrollable track */}
          <div
            ref={scrollRef}
            className="flex flex-nowrap overflow-x-auto gap-6 pb-4 snap-x snap-mandatory w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review, index) => {
              const isLong = review.text.length > MAX_CHARS;
              const truncated = isLong ? review.text.slice(0, MAX_CHARS).trimEnd() + '…' : review.text;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="w-[85vw] md:w-[560px] shrink-0 snap-center md:snap-start"
                >
                  <div className="bg-obsidian border border-white/5 hover:border-gold/30 p-8 md:p-10 md:px-12 relative group transition-all duration-500 rounded-sm flex flex-col h-full min-h-[320px]">
                    <Quote
                      className="absolute top-8 left-8 md:left-12 w-10 h-10 text-white/5 group-hover:text-gold/10 transition-colors duration-500"
                      strokeWidth={1}
                    />

                    {/* review text — truncated */}
                    <div className="flex-1">
                      <p className="font-cormorant italic text-[20px] md:text-[22px] text-cream leading-relaxed relative z-10 pr-6 pt-2">
                        {truncated}
                      </p>
                      {isLong && (
                        <button
                          onClick={() => setActiveReview(review)}
                          className="mt-3 font-jost text-[11px] text-gold uppercase tracking-widest hover:text-cream transition-colors duration-300 flex items-center gap-1 group/btn"
                        >
                          See more
                          <span className="inline-block group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                        </button>
                      )}
                    </div>

                    {/* author */}
                    <div className="flex items-center gap-5 border-t border-white/5 pt-6 group-hover:border-gold/20 transition-colors duration-500 mt-6 shrink-0">
                      <div className="w-11 h-11 shrink-0 flex items-center justify-center font-jost font-medium text-[13px] bg-charcoal text-gold border border-gold/20 rounded-full">
                        {review.initials}
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="font-dmSans font-medium text-ivory text-[15px] tracking-wide mb-1">
                          {review.name}
                        </h3>
                        <p className="font-jost text-[10px] text-smoke/70 uppercase tracking-widest leading-snug">
                          {review.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            {/* trailing spacer */}
            <div className="w-10 shrink-0 pointer-events-none" />
          </div>
        </div>

        {/* mobile scroll hint */}
        <div className="flex justify-center mt-6 md:hidden">
          <motion.span
            className="font-jost text-[11px] text-gold tracking-[0.3em] uppercase flex items-center gap-2"
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            ← swipe to explore →
          </motion.span>
        </div>

        {/* desktop hint (fades out after a few seconds via CSS) */}
        <div className="hidden md:flex justify-center mt-6">
          <span className="font-jost text-[12px] text-gold tracking-[0.3em] uppercase">
            use arrows or drag to explore
          </span>
        </div>
      </div>

      {/* ── Full Review Popup ── */}
      <AnimatePresence>
        {activeReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md px-6"
            onClick={() => setActiveReview(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 24, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative bg-obsidian border border-gold/20 rounded-sm max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* close */}
              <button
                onClick={() => setActiveReview(null)}
                className="absolute top-5 right-5 z-20 text-fog hover:text-gold transition-colors bg-obsidian/80 backdrop-blur-sm rounded-full p-1"
                aria-label="Close"
              >
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>

              <div className="p-10 md:p-14 overflow-y-auto relative w-full h-full custom-scrollbar">
                <Quote
                  className="absolute top-10 left-10 md:left-14 w-10 h-10 text-gold/10"
                  strokeWidth={1}
                />

                <p className="font-cormorant italic text-[18px] md:text-[20px] text-cream leading-relaxed mb-10 pt-10 md:pt-12 relative z-10">
                  {activeReview.text}
                </p>

                <div className="flex items-center gap-5 border-t border-white/10 pt-6 relative z-10">
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center font-jost font-medium text-[14px] bg-charcoal text-gold border border-gold/20 rounded-full">
                    {activeReview.initials}
                  </div>
                  <div>
                    <h3 className="font-dmSans font-medium text-ivory text-[16px] mb-1">{activeReview.name}</h3>
                    <p className="font-jost text-[10px] text-smoke/70 uppercase tracking-widest leading-snug">{activeReview.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ReviewsSection;




