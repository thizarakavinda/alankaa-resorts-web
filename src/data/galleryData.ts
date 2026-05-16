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
  { src: '/images/sunset room.webp', category: 'Rooms' },
  { src: '/images/sunrise room 1.webp', category: 'Rooms' },
  { src: '/images/room hero.webp', category: 'Rooms' },
  { src: '/images/garden view.webp', category: 'Rooms' },
  { src: '/images/view room.webp', category: 'Rooms' },
  { src: '/images/gr1.webp', category: 'Rooms' },

  { src: '/images/gr3.webp', category: 'Rooms' },
  { src: '/images/gr4.webp', category: 'Rooms' },

  { src: '/images/gr6.webp', category: 'Rooms' },
  { src: '/images/gr7.webp', category: 'Rooms' },
  { src: '/images/gr8.webp', category: 'Rooms' },
  { src: '/images/gr9.webp', category: 'Rooms' },
  { src: '/images/gr10.webp', category: 'Rooms' },
  { src: '/images/gr11.webp', category: 'Rooms' },
  { src: '/images/gr12.webp', category: 'Rooms' },
  { src: '/images/gr13.webp', category: 'Rooms' },

  { src: '/images/gr15.webp', category: 'Rooms' },
  { src: '/images/gr16.webp', category: 'Rooms' },
  { src: '/images/gr17.webp', category: 'Rooms' },
  { src: '/images/gr18.webp', category: 'Rooms' },

  { src: '/images/gr20.webp', category: 'Rooms' },

  { src: '/images/gr22.webp', category: 'Rooms' },
  { src: '/images/gr23.webp', category: 'Rooms' },


  { src: '/images/gr26.webp', category: 'Rooms' },
  { src: '/images/gr27.webp', category: 'Rooms' },

  // Pool & Spa
  { src: '/images/pool view.webp', category: 'Pool & Spa' },
  { src: '/images/pool 8.webp', category: 'Pool & Spa' },
  { src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1200', category: 'Pool & Spa' },
  { src: '/images/pool 6.webp', category: 'Pool & Spa' },
  { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/b0/1e/0c/caption.jpg?w=1200&h=-1&s=1', category: 'Pool & Spa' },
  { src: '/images/view 2.webp', category: 'Pool & Spa' },
  { src: '/images/Swiming-Pool.webp', category: 'Pool & Spa' },
  { src: '/images/pool new 1.webp', category: 'Pool & Spa' },
  { src: '/images/Pool 02.webp', category: 'Pool & Spa' },
  { src: '/images/infinity-pool-family.webp', category: 'Pool & Spa' },
  { src: '/images/gpool1.webp', category: 'Pool & Spa' },
  { src: '/images/gpool2.webp', category: 'Pool & Spa' },
  { src: '/images/gpool3.webp', category: 'Pool & Spa' },
  { src: '/images/gpool4.webp', category: 'Pool & Spa' },
  { src: '/images/gpool5.webp', category: 'Pool & Spa' },
  { src: '/images/gpool6.webp', category: 'Pool & Spa' },
  { src: '/images/gpool7.webp', category: 'Pool & Spa' },
  { src: '/images/gpool8.webp', category: 'Pool & Spa' },
  { src: '/images/gpool9.webp', category: 'Pool & Spa' },
  


  // Dining
  { src: '/images/rock 2.webp', category: 'Dining' },
  { src: '/images/rock 1.webp', category: 'Dining' },
  { src: '/images/din 3.webp', category: 'Dining' },
  { src: '/images/nature dining.webp', category: 'Dining' },
  { src: '/images/bar 1.webp', category: 'Dining' },

  { src: '/images/gd3.webp', category: 'Dining' },
  { src: '/images/gd4.webp', category: 'Dining' },
  { src: '/images/gd5.webp', category: 'Dining' },
  { src: '/images/gd6.webp', category: 'Dining' },
  { src: '/images/gd7.webp', category: 'Dining' },

  { src: '/images/gd9.webp', category: 'Dining' },
  { src: '/images/gd10.webp', category: 'Dining' },
  { src: '/images/gd11.webp', category: 'Dining' },

  // Views
  { src: '/images/sky view.webp', category: 'Views' },
  { src: '/images/view 2.webp', category: 'Views' },
  { src: '/images/view 3.webp', category: 'Views' },
  { src: '/images/view 6.webp', category: 'Views' },
  { src: '/images/view 5.webp', category: 'Views' },
  { src: '/images/gv1.webp', category: 'Views' },
  { src: '/images/gv2.webp', category: 'Views' },
  { src: '/images/gv3.webp', category: 'Views' },
  { src: '/images/gv4.webp', category: 'Views' },
  { src: '/images/gv5.webp', category: 'Views' },
  { src: '/images/gv6.webp', category: 'Views' },
  { src: '/images/gv7.webp', category: 'Views' },
  { src: '/images/gv8.webp', category: 'Views' },
  { src: '/images/gv9.webp', category: 'Views' },
  { src: '/images/gv10.webp', category: 'Views' },
  { src: '/images/gv11.webp', category: 'Views' },
  { src: '/images/gv12.webp', category: 'Views' },
  { src: '/images/gv13.webp', category: 'Views' },
  { src: '/images/gv14.webp', category: 'Views' },
  { src: '/images/gv15.webp', category: 'Views' },
  { src: '/images/gv16.webp', category: 'Views' },
  { src: '/images/gv17.webp', category: 'Views' },

  // Exterior
  { src: '/images/ext 1.webp', category: 'Exterior' },
  { src: '/images/ext 2.webp', category: 'Exterior' },
  { src: '/images/ext 3.webp', category: 'Exterior' },
  { src: '/images/ext 4.webp', category: 'Exterior' },
  { src: '/images/ext 5.webp', category: 'Exterior' },

  { src: '/images/ext 9.webp', category: 'Exterior' },
  { src: '/images/ext 10.webp', category: 'Exterior' },
  { src: '/images/ext 11.webp', category: 'Exterior' },
  { src: '/images/ext 12.webp', category: 'Exterior' },
  { src: '/images/ext 13.webp', category: 'Exterior' },
  { src: '/images/ext 15.webp', category: 'Exterior' },
  { src: '/images/ext 16.webp', category: 'Exterior' },
  { src: '/images/ext 17.webp', category: 'Exterior' },
  { src: '/images/ext 19.webp', category: 'Exterior' },
  { src: '/images/ext 20.webp', category: 'Exterior' },
  { src: '/images/ext 21.webp', category: 'Exterior' },
  { src: '/images/ext 22.webp', category: 'Exterior' },
  { src: '/images/ext 23.webp', category: 'Exterior' },
  { src: '/images/ext 24.webp', category: 'Exterior' },
  { src: '/images/ext 25.webp', category: 'Exterior' },

];

export const MOCK_IMAGES: GalleryImageType[] = rawImages.map((img, i) => ({
  id: i,
  src: img.src,
  category: img.category,
  title: `A'Lankaa Collection · ${img.category}`,
  heightClass: HEIGHTS[i % HEIGHTS.length]
}));
