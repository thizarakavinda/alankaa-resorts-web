import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: "Check-in / check-out times?", a: "Standard check-in time is 2:00 PM and check-out is 11:00 AM. Early check-in or late check-out is subject to availability and may incur additional charges." },
  { q: "Is breakfast included?", a: "Yes, a complimentary lavish breakfast is included with all room reservations. We offer both continental and local cuisine options." },
  { q: "Airport transfer available?", a: "Absolutely. We provide luxury airport transfers upon request. Please contact our concierge at least 48 hours prior to your arrival to arrange transportation." },
  { q: "Suitable for children?", a: "Our resort is family-friendly and children are welcome. However, some specific areas like our premium spa are restricted to adults only." },
  { q: "Payment methods accepted?", a: "We accept all major credit cards including Visa, MasterCard, and American Express. We also accept bank transfers and secure online payment gateways." },
  { q: "WiFi availability?", a: "High-speed complimentary WiFi is available throughout the entire resort, including all guest suites, dining areas, and the pool." },
  { q: "Anniversary or honeymoon setups?", a: "We specialize in romantic getaways. We offer bespoke honeymoon setups, private dining experiences, and floral arrangements. Please let us know your requirements in advance." },
  { q: "Spa booking process?", a: "To ensure availability, we recommend booking your spa treatments prior to your arrival or immediately upon check-in with our spa reception." },
  { q: "Dietary options at restaurant?", a: "Our culinary team is well-versed in accommodating various dietary requirements including vegan, gluten-free, and halal options. Kindly inform us before your arrival." },
  { q: "Nearby attractions & activities?", a: "The resort is surrounded by nature trails, tea estates, and historical landmarks like Bambarakanda Falls. We offer guided tours and curated local experiences." },
];

const ContactFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-void py-[120px] px-[80px] max-md:py-20 max-md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-cormorant text-4xl md:text-5xl text-ivory mb-4">
            Questions & Answers
          </h2>
          <p className="font-dmSans text-[16px] text-smoke">
            Everything you need to know before you arrive.
          </p>
        </div>

        <div className="flex flex-col">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border-b border-mist py-6 transition-all duration-300 ${isOpen ? 'border-l-[3px] border-l-gold pl-6' : 'border-l-0 pl-0'}`}
              >
                <div
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => toggleFAQ(idx)}
                >
                  <h3 className={`font-dmSans font-normal text-[16px] transition-colors ${isOpen ? 'text-gold' : 'text-cream group-hover:text-gold'}`}>
                    {faq.q}
                  </h3>
                  <span
                    className={`font-dmSans text-[24px] text-gold transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                    style={{ lineHeight: 1 }}
                  >
                    +
                  </span>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="font-dmSans font-light text-[14px] text-smoke leading-[1.8] pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ;
