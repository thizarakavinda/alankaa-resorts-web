import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Suspense, lazy, useEffect, useState } from 'react';

import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { FloatingBookBtn } from './components/FloatingBookBtn';

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const PlaceholderPage = lazy(() => import('./pages/PlaceholderPage').then((m) => ({ default: m.PlaceholderPage })));
const Rooms = lazy(() => import('./pages/Rooms'));
const Facilities = lazy(() => import('./pages/Facilities'));
const Contact = lazy(() => import('./pages/Contact.tsx'));
const Booking = lazy(() => import('./pages/Booking'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Places = lazy(() => import('./pages/Places'));

import { ThemeProvider } from './context/ThemeContext';

import { useLenis } from './hooks/useLenis';
import { useScrollTrigger } from './hooks/useScrollTrigger';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div className="min-h-screen bg-void" />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/places" element={<Places />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="*" element={<PlaceholderPage title="404 Not Found" />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

function App() {
  const [enableEnhancedFx, setEnableEnhancedFx] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    setEnableEnhancedFx(!prefersReducedMotion && !isCoarsePointer);
  }, []);

  // global hooks init
  useLenis();
  useScrollTrigger();

  return (
    <ThemeProvider>
      <Router>
        <LoadingScreen />

        {enableEnhancedFx && <CustomCursor />}
        <ScrollProgress />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        <FloatingBookBtn />
      </Router>
    </ThemeProvider>
  );
}

export default App;
