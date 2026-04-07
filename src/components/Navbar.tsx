import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isDarkHero = !isScrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] px-6 md:px-12 py-4 md:py-6 transition-all duration-400 ease-in-out ${
          isScrolled
            ? 'backdrop-blur-[20px] backdrop-saturate-150 py-4'
            : 'bg-transparent'
        }`}
        style={{
           backgroundColor: isScrolled ? 'var(--nav-bg)' : 'transparent',
           boxShadow: isScrolled ? 'var(--shadow-nav)' : 'none',
        }}
      >
        <div className="max-w-[1920px] mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex flex-col hoverable group">
            <h1 className="font-cormorant text-[22px] text-gold tracking-wide drop-shadow-sm">
              A'LANKAA
            </h1>
            <span className={`font-jost text-[8px] uppercase tracking-[0.4em] mt-0.5 group-hover:text-gold transition-colors duration-300 ${isDarkHero ? 'text-white/90 drop-shadow-md' : 'text-smoke'}`}>
              Resorts & Spa
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`font-dmSans text-[13px] tracking-[0.05em] hover:text-gold transition-colors duration-300 relative group py-2 hoverable ${isDarkHero ? 'text-white drop-shadow-md' : 'text-cream'}`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-300 ${
                        location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <ThemeToggle />
              {/* Book Now Button */}
              <Link
                to="/booking"
                className="border border-gold px-6 py-2.5 font-jost text-[11px] text-gold uppercase tracking-[0.15em] hover:bg-gold hover:text-void transition-all duration-300 hoverable hover:scale-105"
              >
                Book Now
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gold p-2 hoverable"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-void flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Background subtle image via pseudo element approach or simple div */}
            <div 
              className="absolute inset-0 opacity-5 bg-center bg-cover pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(to bottom, #1E1E1E, #0E0E0E)' }} 
            />
            
            <ul className="flex flex-col items-center gap-6 z-10">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    className="font-cormorant text-[48px] text-ivory hover:text-gold transition-colors duration-300 hoverable"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-8"
              >
                 <Link
                    to="/booking"
                    className="border border-gold px-12 py-4 font-jost text-[14px] text-gold uppercase tracking-[0.2em] hover:bg-gold hover:text-void transition-colors duration-300 hoverable"
                  >
                    Book Now
                  </Link>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 0',
                    borderTop: '1px solid var(--clr-mist)',
                    marginTop: '24px',
                  }}>
                    <span style={{
                      fontFamily: 'Jost',
                      fontSize: '11px',
                      color: 'var(--clr-fog)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3em',
                    }}>
                      {isDark ? 'Dark Mode' : 'Light Mode'}
                    </span>
                    <ThemeToggle />
                  </div>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
