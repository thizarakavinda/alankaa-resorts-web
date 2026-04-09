import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ContactHero from '../components/contact/ContactHero';
import ContactForm from '../components/contact/ContactForm';
import ContactInfoCard from '../components/contact/ContactInfoCard';
import ContactMapSection from '../components/contact/ContactMapSection';
import ContactFAQ from '../components/contact/ContactFAQ';

const Contact = () => {
  useEffect(() => {
    document.title = "Contact | A'Lankaa Resorts & Spa";
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-void min-h-screen"
    >
      <ContactHero />
      
      {/* cont layout */}
      <section className="bg-obsidian py-[120px] px-[80px] max-lg:px-12 max-md:px-6 max-md:py-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-[58%_42%] gap-16 max-lg:grid-cols-1">
          {/* left contact form*/}
          <div className="w-full">
            <ContactForm />
          </div>

          {/* right contact info*/}
          <div className="relative w-full">
            <div className="sticky top-[100px]">
              <ContactInfoCard />
            </div>
          </div>
        </div>
      </section>

      <ContactMapSection />
      
      <ContactFAQ />
    </motion.main>
  );
};

export default Contact;
