import {
    Clock, ThermometerSun, Sun, Coffee, Mountain,
    Droplets, Wind, Waves, HeartHandshake, Sparkles, Activity,
    Utensils, Leaf, Wine, Map, PartyPopper,
    Dumbbell, Calendar, Bed, Users, Baby,
    Compass, Sunrise, Bird, Bike, Car
} from 'lucide-react';
import { createElement } from 'react';

export interface FacilityDetail {
    text: string;
    icon: React.ReactNode;
}

export interface FacilityItem {
    id: number;
    label: string;
    title: string;
    body: string;
    details: FacilityDetail[];
    img: string;
    reverse: boolean;
}

export interface ServiceItem {
    title: string;
    icon: string; 
}

export interface SpaTreatmentItem {
    title: string;
    duration: string;
    price: string;
    desc: string;
}

export const facilitiesData: FacilityItem[] = [
    {
        id: 1,
        label: "SIGNATURE EXPERIENCE",
        title: "Infinity Pool & Sun Terrace",
        body: "Our heated infinity pool at 1,000m appears to dissolve into the mountain skyline. Mornings here are unlike anything else on earth.",
        details: [
            { text: "Open daily 6:00 AM – 10:00 PM", icon: createElement(Clock, { size: 18 }) },
            { text: "Heated pool available", icon: createElement(ThermometerSun, { size: 18 }) },
            { text: "Sun loungers & parasols provided", icon: createElement(Sun, { size: 18 }) },
            { text: "Poolside refreshments available", icon: createElement(Coffee, { size: 18 }) },
            { text: "Mountain panorama from every angle", icon: createElement(Mountain, { size: 18 }) },
        ],
        img: "/images/pool view.jpg",
        reverse: false
    },
    {
        id: 2,
        label: "RESTORATION & RITUAL",
        title: "Spa & Wellness Sanctuary",
        body: "Step into a world of total restoration. From ancient Sri Lankan healing rituals to modern therapeutic treatments — your body and mind will leave renewed.",
        details: [
            { text: "Traditional Sri Lankan herbal massage", icon: createElement(HeartHandshake, { size: 18 }) },
            { text: "Aromatherapy & body scrubs", icon: createElement(Droplets, { size: 18 }) },
            { text: "Steam room & dry sauna", icon: createElement(Wind, { size: 18 }) },
            { text: "Jacuzzi therapy pools", icon: createElement(Waves, { size: 18 }) },
            { text: "Daily yoga — sunrise & sunset sessions", icon: createElement(Activity, { size: 18 }) },
            { text: "Couples treatment suites available", icon: createElement(Sparkles, { size: 18 }) },
        ],
        img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1200",
        reverse: true
    },
    {
        id: 3,
        label: "CULINARY JOURNEYS",
        title: "The Summit Restaurant & Bar",
        body: "Cuisine that rivals the view. Our Executive Chef crafts seasonal menus celebrating Sri Lankan produce alongside international techniques — every meal a memory in itself.",
        details: [
            { text: "Breakfast buffet (6:30 – 10:00 AM)", icon: createElement(Coffee, { size: 18 }) },
            { text: "À la carte lunch & dinner", icon: createElement(Utensils, { size: 18 }) },
            { text: "Vegetarian, vegan & halal options", icon: createElement(Leaf, { size: 18 }) },
            { text: "Curated wine & cocktail menu", icon: createElement(Wine, { size: 18 }) },
            { text: "Full mountain panorama dining room", icon: createElement(Map, { size: 18 }) },
            { text: "Private dining experiences available", icon: createElement(PartyPopper, { size: 18 }) },
        ],
        img: "/images/rock 1.jpeg",
        reverse: false
    },
    {
        id: 4,
        label: "MOVE & RESTORE",
        title: "Fitness Studio & Wellness Room",
        body: "Maintain your rhythm surrounded by the most inspiring natural backdrop imaginable. Our modern studio features premium equipment with floor-to-ceiling mountain views.",
        details: [
            { text: "Modern cardio & weight equipment", icon: createElement(Dumbbell, { size: 18 }) },
            { text: "Free weights & resistance machines", icon: createElement(Dumbbell, { size: 18 }) },
            { text: "Dedicated yoga & stretching space", icon: createElement(Activity, { size: 18 }) },
            { text: "Personal trainer (advance booking)", icon: createElement(Calendar, { size: 18 }) },
            { text: "Open 5:00 AM – 10:00 PM daily", icon: createElement(Clock, { size: 18 }) },
        ],
        img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200",
        reverse: true
    },
    {
        id: 5,
        label: "FAMILY MOMENTS",
        title: "Kids Pool & Family Experiences",
        body: "A'Lankaa is designed for families to reconnect. Our dedicated kids pool and family-focused experiences ensure every guest — at every age — feels completely at home.",
        details: [
            { text: "Dedicated shallow kids pool", icon: createElement(Waves, { size: 18 }) },
            { text: "Crib & extra bed available on request", icon: createElement(Bed, { size: 18 }) },
            { text: "Dedicated kids dining menu", icon: createElement(Utensils, { size: 18 }) },
            { text: "Family room configurations available", icon: createElement(Users, { size: 18 }) },
            { text: "All ages welcome", icon: createElement(Baby, { size: 18 }) },
        ],
        img: "/images/kids pool.png",
        reverse: false
    },
    {
        id: 6,
        label: "THE GREAT OUTDOORS",
        title: "Nature Trails & Outdoor Adventures",
        body: "Step beyond the resort and into one of Sri Lanka's most spectacular natural landscapes. Guided trails, sunrise viewpoints, and adventure — all from your doorstep at 1,000m.",
        details: [
            { text: "Guided mountain hiking trails", icon: createElement(Compass, { size: 18 }) },
            { text: "Cycling tours through tea country", icon: createElement(Bike, { size: 18 }) },
            { text: "Sunrise viewpoint (5:30 AM guided)", icon: createElement(Sunrise, { size: 18 }) },
            { text: "Birdwatching sessions", icon: createElement(Bird, { size: 18 }) },
            { text: "Waterfall day excursions (Bambarakanda)", icon: createElement(Droplets, { size: 18 }) },
            { text: "Day trips to Ella & Nine Arch Bridge", icon: createElement(Car, { size: 18 }) },
        ],
        img: "/images/nature out.png",
        reverse: true
    }
];

export const servicesData: ServiceItem[] = [
    { title: "Car Hire", icon: "/icons/car rent.png" },
    { title: "Currency Exchange", icon: "/icons/currency exc.png" },
    { title: "24-Hr Front Desk", icon: "/icons/24h service.png" },
    { title: "Laundry Service", icon: "/icons/laundry.png" },
    { title: "In-Room Dining", icon: "/icons/in room dining.png" },
    { title: "Free WiFi", icon: "/icons/wifi.png" },
    { title: "Free Parking", icon: "/icons/parking.png" },
    { title: "Special Event Setup", icon: "/icons/event.png" }
];

export const spaMenuData: SpaTreatmentItem[] = [
    {
        title: "Sri Lankan Herbal Massage",
        duration: "60 MIN",
        price: "$65",
        desc: "Ancient island healing using locally-sourced herbs & oils"
    },
    {
        title: "Mountain Stone Therapy",
        duration: "90 MIN",
        price: "$90",
        desc: "Hot volcanic stones release deep muscle tension and restore balance"
    },
    {
        title: "Couples Sanctuary Package",
        duration: "120 MIN",
        price: "$160",
        desc: "A shared journey of massage, scrubs & jacuzzi — for two"
    }
];