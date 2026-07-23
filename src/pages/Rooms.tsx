import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';

import RoomsHero from '../components/rooms/RoomsHero';
import RoomsFilterBar from '../components/rooms/RoomsFilterBar';
import SuitesList from '../components/rooms/SuitesList';
import RoomsInclusions from '../components/rooms/RoomsInclusions';
import RoomsComparisonTable from '../components/rooms/RoomsComparisonTable';
import RoomsPricingCalculator from '../components/rooms/RoomsPricingCalculator';
import RoomsContact from '../components/rooms/RoomsContact';
import { suites } from '../data/roomsData';
import { useSuitePricing, SLUG_MAP } from '../hooks/useSuitePricing';
import BeSearchFormMobile from "../components/beForms/BeSearchFormMobile.tsx";

gsap.registerPlugin(ScrollTrigger);

const Rooms = () => {
  const livePrices = useSuitePricing();
  const [activeFilter, setActiveFilter] = useState('all');

  const suitesWithLivePrice = suites.map((s) => ({
    ...s,
    basePrice: livePrices[SLUG_MAP[s.id]] ?? s.basePrice, // fallback while loading
  }));

  useEffect(() => {
    AOS.init({ once: true });
    document.title = "Rooms & Suites | A'Lankaa Resorts & Spa";

    const suiteImages = document.querySelectorAll('.suite-image-reveal');
    suiteImages.forEach((img) => {
      gsap.fromTo(img,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: img,
            start: 'top 75%'
          }
        }
      );
    });

    const lines = document.querySelectorAll('.gold-line-anim');
    lines.forEach((line) => {
      gsap.fromTo(line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power3.out',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: line,
            start: 'top 85%'
          }
        }
      );
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const filteredSuites = suitesWithLivePrice.filter(suite => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'sunrise') return suite.id === 1;
    if (activeFilter === 'sunset') return suite.id === 2;
    if (activeFilter === 'garden') return suite.id === 3;
    return true;
  });

  const availableCount = filteredSuites.reduce((acc, curr) => acc + curr.available, 0);

  return (
    <div className="bg-[var(--clr-void)] min-h-screen">
      <RoomsHero />
      <BeSearchFormMobile />
      <RoomsFilterBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        availableCount={availableCount}
      />
      <SuitesList activeFilter={activeFilter} suites={suitesWithLivePrice} />
      <RoomsInclusions />
      <RoomsComparisonTable suites={suitesWithLivePrice} />
      <RoomsPricingCalculator suites={suitesWithLivePrice} />
      <RoomsContact />
    </div>
  );
};

export default Rooms;