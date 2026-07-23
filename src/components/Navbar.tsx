import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import BeSearchForm from "./beForms/BeSearchForm.tsx";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();
  const isPlacesPage = location.pathname === "/places";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home',       path: '/'           },
    { name: 'About',      path: '/about'      },
    { name: 'Rooms',      path: '/rooms'      },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Gallery',    path: '/gallery'    },
    { name: 'Contact',    path: '/contact'    },
  ];

  // ── Derived states ──────────────────────────────────────────
  const isDarkHero = !isScrolled && isDark;
  const isSolid = isScrolled || !isDark;

  // Nav link color
  const navLinkColor = isDarkHero
    ? 'text-white drop-shadow-md'   // dark hero: white
    : isDark
      ? 'text-cream'                // dark scrolled: cream
      : 'text-[#2D3748]';           // ← light mode: dark charcoal

  // Logo subtitle color
  const logoSubColor = isDarkHero
    ? 'text-white/90 drop-shadow-md'
    : isDark
      ? 'text-smoke'
      : 'text-[#6B7280]';           // ← light mode: muted gray

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] px-6 md:px-12 transition-all duration-400 ease-in-out ${
          isSolid ? 'py-4' : 'py-4 md:py-6'
        }`}
        style={{
          backgroundColor: isScrolled
            ? isDark ? 'rgba(8,8,8,0.92)' : 'rgba(255,255,255,0.98)'
            : isDark ? 'transparent' : 'rgba(255,255,255,0.95)',
          boxShadow: isSolid
            ? isDark
              ? 'var(--shadow-nav)'
              : '0 1px 0 rgba(184,150,90,0.2), 0 4px 20px rgba(0,0,0,0.06)'
            : 'none',
          backdropFilter: isSolid ? 'blur(20px) saturate(1.5)' : 'none',
        }}
      >
        <div className="max-w-[1920px] mx-auto flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hoverable group">
            <img
              src="/logo.png"
              alt="A'Lankaa Logo"
              className="w-15 h-10"
            />
            <div className="flex flex-col">
              <h1 className="font-cormorant text-[22px] text-gold tracking-wide drop-shadow-sm">
                A'LANKAA
              </h1>
              <span
                className={`font-jost text-[8px] uppercase tracking-[0.4em] mt-0.5 group-hover:text-gold transition-colors duration-300 ${logoSubColor}`}
              >
                Resorts & Spa
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`font-dmSans text-[13px] tracking-[0.05em] hover:text-gold transition-colors duration-300 relative group py-2 hoverable ${navLinkColor}`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-300 ${
                        location.pathname === link.path
                          ? 'w-full'
                          : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <ThemeToggle />

              {/* Book Now button */}
              <Link
                to="/booking"
                className="hoverable hover:scale-105"
                style={{
                  border: '1px solid var(--clr-gold)',
                  padding: '10px 24px',
                  fontFamily: 'Jost',
                  fontSize: '11px',
                  color: 'var(--clr-gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'transparent',
                  // Light mode: slightly visible bg on hover
                  ...(isDark ? {} : {
                    color: '#9A7A3A',           // ← deeper gold for light bg
                    borderColor: '#9A7A3A',
                  }),
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--clr-gold)';
                  e.currentTarget.style.color = isDark ? '#080808' : '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = isDark
                    ? 'var(--clr-gold)'
                    : '#9A7A3A';
                }}
              >
                Book Now
              </Link>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-gold p-2 hoverable"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {!isPlacesPage && <BeSearchForm />}

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-start pt-[120px] pb-[40px] px-6 pointer-events-auto overflow-y-auto"
            style={{
              backgroundColor: isDark
                ? 'var(--clr-void)'
                : 'rgba(255,255,255,0.98)', // ← light mode: white overlay
              backdropFilter: !isDark ? 'blur(20px)' : 'none',
            }}
          >
            <div className="absolute inset-0 opacity-5 bg-center bg-cover pointer-events-none fixed"
              style={{
                backgroundImage: isDark
                  ? 'linear-gradient(to bottom, #1E1E1E, #0E0E0E)'
                  : 'linear-gradient(to bottom, #FAF7F2, #F0EAD6)', // ← light gradient
              }}
            />

            <ul className="flex flex-col items-center gap-6 z-10 w-full max-w-[400px]">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-cormorant text-[40px] md:text-[48px] hover:text-gold transition-colors duration-300 hoverable ${
                      isDark ? 'text-ivory' : 'text-[#2D3748]' // ← light: charcoal
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-8 w-full flex flex-col items-center"
              >
                <Link
                  to="/booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-12 py-4 font-jost text-[14px] uppercase tracking-[0.2em] transition-colors duration-300 hoverable inline-block text-center w-full max-w-[240px]"
                  style={{
                    border: `1px solid ${isDark ? 'var(--clr-gold)' : '#9A7A3A'}`,
                    color: isDark ? 'var(--clr-gold)' : '#9A7A3A',
                  }}
                >
                  Book Now
                </Link>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 0',
                  borderTop: `1px solid ${isDark ? 'var(--clr-mist)' : 'rgba(184,150,90,0.2)'}`,
                  marginTop: '32px',
                  width: '100%',
                }}>
                  <span style={{
                    fontFamily: 'Jost',
                    fontSize: '11px',
                    color: isDark ? 'var(--clr-fog)' : '#9A9590',
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