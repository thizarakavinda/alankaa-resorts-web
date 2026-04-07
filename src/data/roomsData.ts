// Pricing Calculation Helper
export const calculateTotal = (baseUSD: number) => {
  const tax = baseUSD * 0.23;        // 23% prevailing tax
  const service = baseUSD * 0.10;   // 10% service charge
  const total = baseUSD + tax + service;
  return {
    base: baseUSD,
    tax: tax.toFixed(2),
    service: service.toFixed(2),
    total: total.toFixed(2),
  };
};

// Suite Data Array
export const suites = [
  {
    id: 1,
    number: '01',
    category: 'SIGNATURE SUITE',
    badge: 'MOST POPULAR',
    tag: 'SUNRISE · MOUNTAIN & VALLEY VIEW',
    name: 'Sunrise, Mountain & Valley View Suite',
    shortName: 'Sunrise Suite',
    tagline: 'Wake up inside the most spectacular sunrise in Sri Lanka.',
    description: `Perched at 1,000 metres above sea level, 
      our signature Sunrise Suites offer breathtaking views 
      spanning parts of five provinces. Floor-to-ceiling 
      panoramas, private balcony, and a luxurious jacuzzi 
      make this the ultimate mountain escape.`,
    size: '75 sq m',
    view: 'Views of 5 Provinces',
    available: 10,
    basePrice: 230,
    image: '/images/sunrise room 1.jpg',
    features: [
      'Panoramic views of 5 provinces',
      'Private balcony',
      'Separate Jacuzzi (room temperature water)',
      'Hot water shower',
      'Air conditioning & ceiling fan',
      'Complimentary Breakfast (BB)',
      'Complimentary Lunch or Dinner',
      'Daily housekeeping',
    ],
    specs: {
      size: '75 sq m',
      bed: 'King Bed',
      guests: '2 Guests',
      view: '5 Province View',
    },
  },
  {
    id: 2,
    number: '02',
    category: 'DELUXE SUITE',
    badge: 'BEST VALUE',
    tag: 'SUNSET · MOUNTAIN VIEW',
    name: 'Sunset & Mountain View Suite',
    shortName: 'Sunset Suite',
    tagline: 'Golden sunsets over the mountain horizon, every evening.',
    description: `Experience the magic of mountain sunsets 
      from your private balcony. These spacious 55 sq m suites 
      combine elegant comfort with stunning natural vistas — 
      complete with a private jacuzzi and all the amenities 
      for a perfect highland retreat.`,
    size: '55 sq m',
    view: 'Sunset & Mountain View',
    available: 6,
    basePrice: 160,
    image: '/images/sunset room.jpg',
    features: [
      'Sunset & mountain panoramic views',
      'Private balcony',
      'Separate Jacuzzi (room temperature water)',
      'Hot water shower',
      'Air conditioning & ceiling fan',
      'Complimentary Breakfast (BB)',
      'Complimentary Lunch or Dinner',
      'Daily housekeeping',
    ],
    specs: {
      size: '55 sq m',
      bed: 'King Bed',
      guests: '2 Guests',
      view: 'Sunset View',
    },
  },
  {
    id: 3,
    number: '03',
    category: 'GARDEN SUITE',
    badge: null,
    tag: 'GARDEN VIEW',
    name: 'Garden View Suite',
    shortName: 'Garden Suite',
    tagline: 'Surrounded by lush tropical gardens in complete serenity.',
    description: `Our Garden View Suites offer a peaceful 
      sanctuary immersed in tropical greenery. Perfect for 
      guests who seek tranquility — these comfortable 50 sq m 
      suites include all essential amenities with the soothing 
      sounds of nature as your backdrop.`,
    size: '50 sq m',
    view: 'Lush Garden View',
    available: 6,
    basePrice: 130,
    image: '/images/garden view.jpg',
    features: [
      'Lush tropical garden views',
      'Hot water shower',
      'Air conditioning & ceiling fan',
      'Complimentary Breakfast (BB)',
      'Complimentary Lunch or Dinner',
      'Daily housekeeping',
    ],
    specs: {
      size: '50 sq m',
      bed: 'King Bed',
      guests: '2 Guests',
      view: 'Garden View',
    },
  },
];