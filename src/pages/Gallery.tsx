import { useEffect, useMemo, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GalleryHero from '../components/gallery/GalleryHero';
import GalleryFilter from '../components/gallery/GalleryFilter';
import GalleryMasonry from '../components/gallery/GalleryMasonry';
import GalleryVideos from '../components/gallery/GalleryVideos';
import GalleryDrone from '../components/gallery/GalleryDrone';
import GalleryInstagram from '../components/gallery/GalleryInstagram';
import { CATEGORIES, MOCK_IMAGES } from '../data/galleryData';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);

  const filteredImages = useMemo(
    () => (activeCategory === 'All'
      ? MOCK_IMAGES
      : MOCK_IMAGES.filter((image) => image.category === activeCategory)),
    [activeCategory],
  );

  useEffect(() => {
    document.title = "Gallery | A'Lankaa Resorts & Spa";
    window.scrollTo(0, 0);
    AOS.init({ once: true });
    AOS.refresh();
  }, []);

  return (
    <main className="min-h-screen bg-void w-full overflow-hidden">
      <GalleryHero />
      <GalleryFilter
        categories={CATEGORIES}
        activeTab={activeCategory}
        onChange={setActiveCategory}
        totalImages={filteredImages.length}
      />
      <GalleryMasonry images={filteredImages} />
      <GalleryVideos />
      <GalleryDrone />
      <GalleryInstagram />
    </main>
  );
};

export default Gallery;
