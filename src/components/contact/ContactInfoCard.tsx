import { MapPin, Phone, Mail, Clock, Globe } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTripadvisor, FaWhatsapp } from 'react-icons/fa';

const ContactInfoCard = () => {
  return (
    <div className="w-full relative">
      <div className="bg-charcoal border border-[rgba(184,150,90,0.15)] border-l-[3px] border-l-gold py-12 px-10 rounded-[2px]">

        <h3 className="font-jost text-[10px] text-gold uppercase tracking-[0.3em] mb-6">
          A'Lankaa Resorts & Spa
        </h3>

        <div className="w-[40px] h-[1px] bg-gold mb-8"></div>

        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-start gap-6">
            <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" strokeWidth={1.5} />
            <p className="font-dmSans text-[14px] text-smoke leading-relaxed">
              Wattagamuwa, Haldummulla,<br />
              Badulla 90180, Sri Lanka
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Phone className="w-5 h-5 text-gold shrink-0" strokeWidth={1.5} />
            <a href="tel:+94707975975" className="font-dmSans text-[14px] text-smoke hover:text-gold transition-colors">
              +94 70 797 5975
            </a>
          </div>

          <div className="flex items-center gap-6">
            <Mail className="w-5 h-5 text-gold shrink-0" strokeWidth={1.5} />
            <a href="mailto:info@alankaaresorts.com" className="font-dmSans text-[14px] text-smoke hover:text-gold transition-colors">
              info@alankaaresorts.com
            </a>
          </div>

          <div className="flex items-center gap-6">
            <Clock className="w-5 h-5 text-gold shrink-0" strokeWidth={1.5} />
            <p className="font-dmSans text-[14px] text-smoke">
              Check-in: 12:00 PM · Out: 10:00 AM
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Globe className="w-5 h-5 text-gold shrink-0" strokeWidth={1.5} />
            <a href="https://www.alankaaresorts.com" target="_blank" rel="noopener noreferrer" className="font-dmSans text-[14px] text-smoke hover:text-gold transition-colors">
              www.alankaaresorts.com
            </a>
          </div>
        </div>

        <div className="w-full h-[1px] bg-mist mb-8"></div>

        <div className="flex items-center gap-8">
          <a href="#" className="text-smoke hover:text-gold transition-colors duration-300">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="text-smoke hover:text-gold transition-colors duration-300">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="text-smoke hover:text-gold transition-colors duration-300">
            <FaTripadvisor size={24} />
          </a>
        </div>
      </div>

      <a
        href="https://wa.me/94707975975"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full mt-6 bg-[#25D366] text-white flex items-center justify-center gap-3 py-4 hover:bg-[#20bd5a] transition-colors duration-300"
      >
        <FaWhatsapp size={20} />
        <span className="font-jost text-[11px] uppercase tracking-[0.1em] font-medium">Chat on WhatsApp</span>
      </a>
    </div>
  );
};

export default ContactInfoCard;
