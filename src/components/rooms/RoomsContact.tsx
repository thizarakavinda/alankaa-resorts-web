import { Phone, Mail, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const RoomsContact = () => {
  return (
    <section className="bg-[var(--clr-forest)] px-[24px] py-[60px] lg:px-[80px] lg:py-[100px] border-t border-[rgba(184,150,90,0.15)] flex flex-col lg:flex-row gap-12">

      {/* left*/}
      <div className="w-full lg:w-[55%]" data-aos="fade-up" data-aos-once="true">
        <p className="font-['Jost'] text-[10px] text-[var(--clr-gold)] uppercase tracking-[0.4em] mb-[8px]">RESERVE YOUR SUITE</p>
        <h2 className="font-['Cormorant'] italic text-[clamp(36px,4vw,60px)] text-[var(--clr-ivory)] font-light leading-[1.1]">
          <span className="block">Your mountain escape</span>
          <span className="block">is waiting for you.</span>
        </h2>
        <p className="font-['DM_Sans'] text-[15px] text-[var(--clr-smoke)] mt-[20px] max-w-lg">
          Contact our reservations team directly for availability, special requests,
          or to book your perfect suite.
        </p>

        <div className="flex flex-col gap-[16px] mt-[32px]">
          <div className="flex items-center gap-[12px]">
            <Phone size={20} color="var(--clr-gold)" />
            <span className="font-['DM_Sans'] font-medium text-[16px] text-[var(--clr-cream)]">070 797 5975</span>
          </div>
          <div className="flex items-center gap-[12px]">
            <Mail size={20} color="var(--clr-gold)" />
            <span className="font-['DM_Sans'] font-medium text-[16px] text-[var(--clr-cream)]">alankaasales@gmail.com</span>
          </div>
          <div className="flex items-center gap-[12px]">
            <MapPin size={20} color="var(--clr-gold)" />
            <span className="font-['DM_Sans'] font-light text-[14px] text-[var(--clr-smoke)]">Wattagamuwa, Halatuthenne, Haldummulla</span>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="w-full lg:w-[45%] flex flex-col gap-[16px] justify-center" data-aos="fade-up" data-aos-delay="200" data-aos-once="true">
        <a href="/booking" className="inline-block w-full bg-[var(--clr-gold)] text-[var(--clr-void)] font-['Jost'] text-[12px] uppercase py-[20px] px-[48px] text-center tracking-[0.15em] hover:bg-[var(--clr-gold-light)] transition-colors">
          Book a Suite Online &rarr;
        </a>
        <a href="https://wa.me/94707975975" target="_blank" rel="noopener noreferrer" className="flex items-center w-full justify-center gap-2 bg-[rgba(37,211,102,0.1)] border border-[rgba(37,211,102,0.3)] text-[#25D366] font-['Jost'] text-[12px] uppercase py-[20px] px-[48px] text-center hover:bg-[rgba(37,211,102,0.2)] transition-colors">
          <FaWhatsapp size={16} /> WhatsApp Us
        </a>
        <a href="mailto:alankaasales@gmail.com" className="flex items-center w-full justify-center gap-2 bg-transparent border border-[rgba(184,150,90,0.3)] text-[var(--clr-gold)] font-['Jost'] text-[12px] uppercase py-[20px] px-[48px] text-center hover:bg-[rgba(184,150,90,0.05)] transition-colors">
          <Mail size={16} /> Email Enquiry
        </a>
        <p className="font-['Jost'] text-[10px] text-[var(--clr-fog)] text-center mt-[8px]">
          Our team responds within 2 hours
        </p>
      </div>

    </section>
  );
};

export default RoomsContact;