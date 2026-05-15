import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: "Resort Overview",
    duration: "1:29",
    embedId: "yrTdYGlEbFU",
    thumbnail: "images/v1.webp",
  },
  {
    id: 2,
    title: "A Peek into the Alankaa",
    duration: "7:06",
    embedId: "-p7IciY-jEc",
    thumbnail: "images/infinity-pool-family.webp",
  },
];

const GalleryVideos = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const closeVideo = () => setActiveVideo(null);

  const activeVid = videos.find((v) => v.id === activeVideo);

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
                  onError={(e) => {
                    const img = e.currentTarget;
                    // fallback chain: maxresdefault → hqdefault → mqdefault
                    if (img.src.includes('maxresdefault')) {
                      img.src = `https://img.youtube.com/vi/${vid.embedId}/hqdefault.jpg`;
                    } else if (img.src.includes('hqdefault')) {
                      img.src = `https://img.youtube.com/vi/${vid.embedId}/mqdefault.jpg`;
                    }
                  }}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />

                {/* play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-void transform transition-transform duration-500 group-hover:scale-110 shadow-lg">
                    <Play className="w-6 h-6 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>

              <div className="flex border-l-2 border-gold pl-4 flex-col">
                <h3 className="font-dmSans text-[18px] text-ivory mb-1 group-hover:text-gold transition-colors">
                  {vid.title}
                </h3>
                <span className="font-jost text-[12px] text-fog tracking-widest">{vid.duration}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* lightbox modal */}
      <AnimatePresence>
        {activeVideo !== null && activeVid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(0,0,0,0.95)] backdrop-blur-md"
            onClick={closeVideo}
          >
            {/* close button */}
            <button
              onClick={closeVideo}
              className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] p-2 text-smoke hover:text-gold transition-colors"
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>

            {/* iframe wrapper */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full max-w-[80vw] mx-auto aspect-video rounded-[2px] overflow-hidden shadow-2xl shadow-black border border-[rgba(255,255,255,0.05)]"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                key={activeVideo}
                src={`https://www.youtube.com/embed/${activeVid.embedId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVid.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryVideos;
