import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: "Resort Overview",
    duration: "3:42",
    thumbnail: "https://images.unsplash.com/photo-1542314831-c6a4d27d66f6?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Sunrise from the Indrajith Suite",
    duration: "1:15",
    thumbnail: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80"
  }
];

const GalleryVideos = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const closeVideo = () => setActiveVideo(null);

  return (
    <section className="bg-obsidian px-6 py-24 md:px-20 md:py-28 border-t border-[rgba(255,255,255,0.03)]">
      <div className="max-w-[1400px] mx-auto">

        {/* header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="font-cormorant text-4xl md:text-5xl text-ivory mb-4">Experience A'Lankaa</h2>
          <p className="font-dmSans text-[16px] text-fog">Beyond words — watch the story unfold.</p>
        </div>

        {/* video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {videos.map((vid, i) => (
            <div
              key={vid.id}
              data-aos="fade-up"
              data-aos-delay={i * 200}
              className="group cursor-pointer"
              onClick={() => setActiveVideo(vid.id)}
            >
              <div className="relative w-full aspect-video rounded-[2px] overflow-hidden bg-charcoal mb-6 border border-[rgba(255,255,255,0.05)]">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />

                {/* play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-void transform transition-transform duration-500 group-hover:scale-110 shadow-lg">
                    <Play className="w-6 h-6 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>

              <div className="flex border-l-2 border-gold pl-4 flex-col">
                <h3 className="font-dmSans text-[18px] text-ivory mb-1 group-hover:text-gold transition-colors">{vid.title}</h3>
                <span className="font-jost text-[12px] text-fog tracking-widest">{vid.duration}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* video placeholder */}
      <AnimatePresence>
        {activeVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(0,0,0,0.98)] backdrop-blur-md"
            onClick={closeVideo}
          >
            <button
              onClick={closeVideo}
              className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] p-2 text-smoke hover:text-gold transition-colors"
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-[80vw] mx-auto aspect-video bg-[#0a0a0a] border border-[rgba(255,255,255,0.05)] rounded-[2px] flex items-center justify-center relative overflow-hidden shadow-2xl shadow-black"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full border border-mist flex flex-col items-center justify-center mb-6">
                  <Play className="w-8 h-8 text-mist ml-1 opacity-50" />
                </div>
                <p className="font-dmSans text-[14px] text-fog">Video Player Implementation Required</p>
                <p className="font-jost text-[10px] text-smoke mt-2 uppercase tracking-widest">
                  {videos.find(v => v.id === activeVideo)?.title}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default GalleryVideos;
