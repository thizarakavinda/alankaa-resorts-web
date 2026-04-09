import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTripadvisor } from 'react-icons/fa';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-void border-t border-[rgba(184,150,90,0.2)] overflow-hidden">

      <div className="absolute inset-0 pointer-events-none opacity-[0.07] z-0" style={{
        background: 'linear-gradient(to top, var(--clr-moss) 0%, transparent 100%)'
      }} />

      <div className="relative z-10 max-w-[1920px] mx-auto">
        {/* upper foot */}
        <div className="px-6 md:px-20 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* col 1 */}
          <div className="lg:col-span-1 pr-0 md:pr-12">
            <h2 className="font-cormorant text-[32px] text-gold mb-1">A'LANKAA</h2>
            <p className="font-jost text-[9px] text-fog uppercase tracking-widest mb-6">Resorts & Spa</p>
            <div className="h-[1px] w-10 bg-gold mb-6" />
            <p className="font-cormorant italic text-[18px] text-smoke leading-relaxed mb-8">
              "Where the clouds kiss the mountains, and luxury finds its home."
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-fog hover:text-gold transition-colors hoverable"><FaFacebook size={24} /></a>
              <a href="#" className="text-fog hover:text-gold transition-colors hoverable"><FaInstagram size={24} /></a>
              <a href="#" className="text-fog hover:text-gold transition-colors hoverable"><FaTripadvisor size={24} /></a>
            </div>
          </div>

          {/* col 2 */}
          <div className="flex flex-col">
            <h3 className="font-jost text-[10px] text-gold uppercase tracking-[0.2em] mb-8">Explore</h3>
            <ul className="flex flex-col gap-4">
              {['Home', 'About Us', 'Rooms', 'Facilities', 'Gallery', 'Contact', 'Book Now'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`}
                    className="font-dmSans text-[14px] text-smoke hover:text-cream transition-all duration-300 hover:translate-x-1 block hoverable w-fit"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* col 3 */}
          <div className="flex flex-col">
            <h3 className="font-jost text-[10px] text-gold uppercase tracking-[0.2em] mb-8">Find Us</h3>
            <ul className="flex flex-col gap-5">
              <li className="font-dmSans text-[14px] text-smoke leading-relaxed flex items-start gap-2">
                <MapPin className="text-gold mt-1 w-4 h-4 shrink-0" />
                <span>Wattagamuwa, Haldummulla,<br />Badulla 90180, Sri Lanka</span>
              </li>
              <li className="font-dmSans text-[14px] text-smoke flex items-center gap-2">
                <Phone className="text-gold w-4 h-4 shrink-0" />
                +94 70 797 5975
              </li>
              <li className="font-dmSans text-[14px] text-smoke flex items-center gap-2">
                <Mail className="text-gold w-4 h-4 shrink-0" />
                info@alankaaresorts.com
              </li>
              <li className="font-dmSans text-[14px] text-smoke flex items-center gap-2 mt-2">
                <Clock className="text-gold w-4 h-4 shrink-0" />
                Check-in 12PM | Out 10AM
              </li>
            </ul>
          </div>

          {/* col 4 */}
          <div className="flex flex-col">
            <h3 className="font-jost text-[10px] text-gold uppercase tracking-[0.2em] mb-2">Stay Connected</h3>
            <p className="font-dmSans text-[14px] text-smoke mb-6">Exclusive offers and resort stories.</p>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-transparent border-0 border-b border-gold pb-3 font-dmSans text-[14px] text-cream placeholder:text-fog focus:ring-0 focus:outline-none w-full hoverable"
              />
              <button
                type="submit"
                className="font-jost text-[11px] text-gold uppercase tracking-widest text-left mt-2 hover:text-cream transition-colors flex items-center gap-2 hoverable w-fit hover:translate-x-1"
              >
                Subscribe <span className="text-lg leading-none">→</span>
              </button>
            </form>
          </div>

        </div>

        {/* lower foot */}
        <div className="border-t border-mist px-6 md:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-dmSans text-[12px] text-fog">
            © 2025 A'Lankaa Resorts & Spa. All rights reserved.
          </p>
          <div className="flex items-center gap-4 font-dmSans text-[12px] text-fog">
            <Link to="/privacy" className="hover:text-gold transition-colors hoverable">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-gold transition-colors hoverable">Terms</Link>
            <span>·</span>
            <Link to="/sitemap" className="hover:text-gold transition-colors hoverable">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
