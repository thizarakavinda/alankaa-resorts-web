import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { FloatingBookBtn } from './components/FloatingBookBtn';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { PlaceholderPage } from './pages/PlaceholderPage';

import { useLenis } from './hooks/useLenis';
import { useScrollTrigger } from './hooks/useScrollTrigger';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms" element={<PlaceholderPage title="Rooms & Pricing" />} />
        <Route path="/facilities" element={<PlaceholderPage title="Facilities" />} />
        <Route path="/gallery" element={<PlaceholderPage title="Gallery" />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
        <Route path="/booking" element={<PlaceholderPage title="Reservation" />} />
        <Route path="*" element={<PlaceholderPage title="404 Not Found" />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  // Initialize global hooks
  useLenis();
  useScrollTrigger();

  return (
    <Router>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      
      <AnimatedRoutes />
      
      <Footer />
      <FloatingBookBtn />
    </Router>
  );
}

export default App;
