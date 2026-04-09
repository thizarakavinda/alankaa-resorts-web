import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Expand, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryImageType } from '../../data/galleryData';

type GalleryMasonryProps = {
  images: GalleryImageType[];
};

const GalleryMasonry = ({ images }: GalleryMasonryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeLightbox = () => setSelectedIndex(null);

  const nextImage = useCallback(() => {
    if (selectedIndex === null || images.length === 0) return;
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % images.length));
  }, [images.length, selectedIndex]);

  const prevImage = useCallback(() => {
    if (selectedIndex === null || images.length === 0) return;
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
  }, [images.length, selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;
    if (images.length === 0 || selectedIndex >= images.length) {
      setSelectedIndex(null);
    }
  }, [images, selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, nextImage, prevImage]);

  return (
    <section className="bg-void px-6 py-16 md:px-20 md:py-24">
      <div className="max-w-[1400px] mx-auto columns-1 md:columns-2 lg:columns-3 gap-4">

        {images.map((img, i) => (
          <div
            key={img.id}
            data-aos="fade-up"
            data-aos-delay={(i % 3) * 100}
            className={`break-inside-avoid mb-4 relative overflow-hidden rounded-[2px] group cursor-pointer bg-charcoal ${img.heightClass}`}
            onClick={() => setSelectedIndex(i)}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />


            <div className="absolute inset-0 bg-[rgba(8,8,8,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center pointer-events-none">
              <Expand className="w-8 h-8 text-cream opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100" strokeWidth={1} />
            </div>

            {/* filter tag */}
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 pointer-events-none">
              <div className="bg-[rgba(8,8,8,0.8)] px-3 py-1.5 rounded-[1px] font-jost text-[9px] uppercase tracking-[0.1em] text-gold border border-[rgba(184,150,90,0.2)]">
                {img.category}
              </div>
            </div>
          </div>
        ))}
      </div>


      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(0,0,0,0.95)] backdrop-blur-sm"
          >
            {/* top right close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 md:top-10 md:right-10 z-50 p-2 text-smoke hover:text-gold transition-colors"
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>

            {/* nav arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-50 p-3 text-smoke hover:text-gold transition-colors"
            >
              <ChevronLeft className="w-10 h-10" strokeWidth={1} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-50 p-3 text-smoke hover:text-gold transition-colors"
            >
              <ChevronRight className="w-10 h-10" strokeWidth={1} />
            </button>

            {/* main img */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-[85vw] md:max-w-[75vw] h-full max-h-[85vh] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].title}
                className="max-w-full max-h-full object-contain rounded-[2px]"
              />
            </motion.div>

            {/* bottom info bar */}
            <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 flex justify-between items-end border-t border-[rgba(255,255,255,0.1)] pt-4 pointer-events-none">
              <div className="flex flex-col">
                <span className="font-jost text-[10px] text-gold uppercase tracking-[0.1em] mb-1">
                  {images[selectedIndex].category}
                </span>
                <span className="font-dmSans text-[14px] text-ivory">
                  {images[selectedIndex].title}
                </span>
              </div>
              <div className="font-jost text-[12px] text-fog tracking-widest">
                {(String(selectedIndex + 1)).padStart(2, '0')} / {images.length}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryMasonry;
