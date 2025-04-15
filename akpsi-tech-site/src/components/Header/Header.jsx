import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Header/Header.css';

const Header = () => {
  const location = useLocation();

  // Function to scroll to a specific element by ID
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle the About link click
  const handleAboutClick = (e) => {
    // If we're on the home page, scroll to the "our-story" section
    if (location.pathname === '/') {
      e.preventDefault(); // Prevent default navigation
      scrollToSection('our-story');
    }
    // Otherwise, let the Link component handle the navigation
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <div className="logo-text">
              <h1>ALPHA KAPPA PSI</h1>
              <h2>OMEGA THETA</h2>
            </div>
          </Link>
        </div>
        
        <div className="header-right">
          <div className="search-box">
            <button className="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          
          <nav className="nav-links">
            <Link to="/#about" className="nav-link" onClick={handleAboutClick}>About</Link>
            <Link to="/recruitment" className="nav-link">Recruitment</Link>
            <Link to="/exec" className="nav-link">Exec</Link>
            <Link to="/brothers" className="nav-link">Brothers</Link>
            <Link to="/alumni" className="nav-link">Alumni</Link>
          </nav>
          
          <Link to="/contact" className="contact-button">
            CONTACT US
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 