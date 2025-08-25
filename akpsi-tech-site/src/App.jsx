import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import ExecPage from './components/Exec/ExecPage';
import Footer from './components/Footer/Footer';
import Banner from './components/Home/Banner';
import Story from './components/Home/Story';
import Organizations from './components/Home/Organizations';
import Pillars from './components/Home/Pillars';
import PhotoWheel from './components/Home/PhotoWheel';
import Awards from './components/Home/Awards';
import Sponsors from './components/Home/Sponsors';
import BrotherPage from './components/Brother/BrotherPage';
import './App.css';
import AlumniPage from './components/Alumni/AlumniPage';
import RecruitmentPage from './components/Recruitment/RecruitmentPage';
import AboutPage from './components/About/AboutPage';
import ContactPage from './components/Contact/contact';
import NotFoundPage from './components/404/404Page';

// Create a component to handle scrolling to hash elements
const ScrollToHashElement = () => {
  const location = useLocation();

  useEffect(() => {
    // If there's a hash in the URL
    if (location.hash) {
      const elementId = location.hash.substring(1); // Remove the '#' character
      
      // Wait a bit for the DOM to fully load
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If no hash, scroll to top of the page
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
};

// Mobile optimization component
const MobileOptimizer = () => {
  useEffect(() => {
    // Add mobile-specific classes
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      document.body.classList.add('mobile-device');
    }

    // Prevent zoom on double tap
    const preventZoom = (e) => {
      let lastTouchEnd = 0;
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener('touchend', preventZoom, false);

    // Add touch feedback to buttons
    const buttons = document.querySelectorAll('button, .header-button, .nav-link');
    buttons.forEach(button => {
      button.addEventListener('touchstart', () => {
        button.style.opacity = '0.7';
      });
      button.addEventListener('touchend', () => {
        button.style.opacity = '1';
      });
    });

    return () => {
      document.removeEventListener('touchend', preventZoom);
      buttons.forEach(button => {
        button.removeEventListener('touchstart', () => {});
        button.removeEventListener('touchend', () => {});
      });
    };
  }, []);

  return null;
};

const App = () => {
  const Home = () => {
    return (
      <div className="app">
        <Banner />
        <Sponsors />
        <Story />
        <Organizations />
        <Pillars />
        <PhotoWheel />
        <Awards />
      </div>
    );
  };

  return (
    <Router>
      <MobileOptimizer />
      <Header />
      <ScrollToHashElement />
      
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/exec" element={<ExecPage />} />
          <Route path="/recruitment" element={<RecruitmentPage />} />
          <Route path="/brothers" element={<BrotherPage />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element = {<NotFoundPage/>} />
        </Routes>
      </main>
      
      <Footer />
    </Router>
  );
};

export default App;