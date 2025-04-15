import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Header/Header.css';
import logo from "/assets/Akpsi-emblem.png";

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll to a specific element by ID
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle the About link click
  const handleAboutClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      scrollToSection('our-story');
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="emblem-container">
          <img 
            src={logo} 
            alt="Alpha Kappa Psi logo" 
            className="logo" 
          />
          <h1 className="logo-text">
            ALPHA KAPPA PSI<br />OMEGA THETA
          </h1>
        </div>

        
        <div className={`header-right ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>

          
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

        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
};

export default Header; 