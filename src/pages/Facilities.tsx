import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { facilitiesData } from '../data/facilitiesData';
import FacilitiesHero from '../components/facilities/FacilitiesHero';
import FacilitiesIntro from '../components/facilities/FacilitiesIntro';
import FacilitySection from '../components/facilities/FacilitySection';
import ServicesGrid from '../components/facilities/ServicesGrid';
import SpaTreatments from '../components/facilities/SpaTreatments';

gsap.registerPlugin(ScrollTrigger);

const Facilities = () => {
  useEffect(() => {
    AOS.init({ once: true });
    document.title = "Facilities & Amenities | A'Lankaa Resorts & Spa";


    const facilityImages = document.querySelectorAll('.facility-image-reveal');
    facilityImages.forEach((img) => {
      const isReverse = img.getAttribute('data-reverse') === 'true';
      const clipStart = isReverse ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)';

      gsap.fromTo(img,
        { clipPath: clipStart },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: img,
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

  return (
    <div className="bg-[var(--clr-void)] min-h-screen">
      {/* hero sec */}
      <FacilitiesHero />

      {/* intro */}
      <FacilitiesIntro />

      {/* six facility sections */}
      {facilitiesData.map((fac) => (
        <FacilitySection key={fac.id} facility={fac} />
      ))}

      {/* services grid */}
      <ServicesGrid />

      {/* spa menu highlight */}
      <SpaTreatments />
    </div>
  );
};

export default Facilities;