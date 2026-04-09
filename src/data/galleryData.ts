export const CATEGORIES = ["All", "Rooms", "Pool & Spa", "Dining", "Views", "Exterior"];

const HEIGHTS = ["aspect-[4/3]", "aspect-[2/3]", "aspect-square"];
const CATEGORIES_NO_ALL = ["Rooms", "Pool & Spa", "Dining", "Views", "Exterior"];

export type GalleryImageType = {
  id: number;
  src: string;
  category: string;
  title: string;
  heightClass: string;
};

export const MOCK_IMAGES: GalleryImageType[] = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  src: `https://images.unsplash.com/photo-${[
    '1582719478250-c89cae4dc85b', // room
    '1520250497591-112f2f40a3f4', // poolI
    '1517248135467-4c7edcad34c4', // dining
    '1506929562872-bb421503ef21', // landscape
    '1542314831-c6a4d27d66f6', // resort
    '1572331165275-cd812ab5e1f0', // villa
    '1571896349842-33c89424de2d', // bed
    '1514933651103-005eec06c04b', // nature
  ][i % 8]}?auto=format&fit=crop&q=80`,
  category: CATEGORIES_NO_ALL[i % CATEGORIES_NO_ALL.length],
  title: `A'Lankaa Collection · ${CATEGORIES_NO_ALL[i % CATEGORIES_NO_ALL.length]}`,
  heightClass: HEIGHTS[i % HEIGHTS.length]
}));
