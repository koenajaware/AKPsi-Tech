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
// import Footer from './components/Footer/Footer';
import './App.css';
import AlumniPage from './components/Alumni/AlumniPage';

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
      <Header />
      <ScrollToHashElement />
      
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exec" element={<ExecPage />} />
          <Route path="/recruitment" element={<div>Recruitment Page</div>} />
          <Route path="/brothers" element={<BrotherPage />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
      </main>
      
      <Footer />
    </Router>
  );
};

export default App;