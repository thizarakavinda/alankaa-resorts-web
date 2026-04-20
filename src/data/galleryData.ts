export const CATEGORIES = ["All", "Rooms", "Pool & Spa", "Dining", "Views", "Exterior"];

const HEIGHTS = ["aspect-[4/3]", "aspect-[2/3]", "aspect-square"];
export type GalleryImageType = {
  id: number;
  src: string;
  category: string;
  title: string;
  heightClass: string;
};

const rawImages = [
  // Rooms
  { src: '/images/sunset room.jpg', category: 'Rooms' },
  { src: '/images/sunrise room 1.jpg', category: 'Rooms' },
  { src: '/images/room hero.png', category: 'Rooms' },
  { src: '/images/garden view.jpg', category: 'Rooms' },
  { src: '/images/view room.jpg', category: 'Rooms' },

  // Pool & Spa
  { src: '/images/pool view.jpg', category: 'Pool & Spa' },
  { src: '/images/pool 8.jpg', category: 'Pool & Spa' },
  { src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1200', category: 'Pool & Spa' },
  { src: '/images/pool 6.jpg', category: 'Pool & Spa' },
  { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/b0/1e/0c/caption.jpg?w=1200&h=-1&s=1', category: 'Pool & Spa' },

  // Dining
  { src: '/images/rock 2.jpg', category: 'Dining' },
  { src: '/images/rock 1.jpeg', category: 'Dining' },
  { src: '/images/din 3.jpg', category: 'Dining' },
  { src: '/images/nature dining.png', category: 'Dining' },
  { src: '/images/bar 1.jpg', category: 'Dining' },

  // Views
  { src: '/images/sky view.jpg', category: 'Views' },
  { src: '/images/view 2.jpg', category: 'Views' },
  { src: '/images/view 3.jpg', category: 'Views' },
  { src: '/images/view 6.jpg', category: 'Views' },
  { src: '/images/view 5.jpg', category: 'Views' },

  // Exterior
  { src: '/images/ext 1.jpg', category: 'Exterior' },
  { src: '/images/ext 2.jpg', category: 'Exterior' },
  { src: '/images/ext 3.jpg', category: 'Exterior' },
  { src: '/images/ext 4.jpg', category: 'Exterior' },
  { src: '/images/ext 5.jpg', category: 'Exterior' },
];

export const MOCK_IMAGES: GalleryImageType[] = rawImages.map((img, i) => ({
  id: i,
  src: img.src,
  category: img.category,
  title: `A'Lankaa Collection · ${img.category}`,
  heightClass: HEIGHTS[i % HEIGHTS.length]
}));
