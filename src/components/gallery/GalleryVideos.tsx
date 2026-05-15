import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';

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
  const openYouTube = (embedId: string) => {
    window.open(`https://www.youtube.com/watch?v=${embedId}`, '_blank', 'noopener,noreferrer');
  };

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
            <motion.div
              key={vid.id}
              data-aos="fade-up"
              data-aos-delay={i * 200}
              className="group cursor-pointer"
              onClick={() => openYouTube(vid.embedId)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="relative w-full aspect-video rounded-[2px] overflow-hidden bg-charcoal mb-6 border border-[rgba(255,255,255,0.05)]">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  onError={(e) => {
                    const img = e.currentTarget;
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

                {/* YouTube badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-[11px] font-dmSans tracking-widest uppercase px-2.5 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="w-3 h-3" />
                  Watch on YouTube
                </div>
              </div>

              <div className="flex border-l-2 border-gold pl-4 flex-col">
                <h3 className="font-dmSans text-[18px] text-ivory mb-1 group-hover:text-gold transition-colors">
                  {vid.title}
                </h3>
                <span className="font-jost text-[12px] text-fog tracking-widest">{vid.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GalleryVideos;
