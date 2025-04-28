import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Header/Header.css';
import logo from "/assets/Akpsi-emblem.png";

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        {/* Left Navigation Links */}
        <div className="left-section">
          <nav className="nav-links">
            <Link to="/#about" className="nav-link" onClick={handleAboutClick}>About</Link>
            <Link to="/recruitment" className="nav-link">Recruitment</Link>
            <Link to="/exec" className="nav-link">Exec</Link>
            <Link to="/brothers" className="nav-link">Brothers</Link>
            <Link to="/alumni" className="nav-link">Alumni</Link>
          </nav>
        </div>

        {/* Center Logo */}
        <div className="center-section">
          <Link to="/" className="center-logo">
            <span className="center-text">OMEGA</span>
            <img src={logo} alt="Alpha Kappa Psi logo" className="logo" />
            <span className="center-text">THETA</span>
          </Link>
        </div>

        {/* Right Button */}
        <div className="right-section">
          <div className="header-buttons">
            <Link to="/contact" className="header-button">CONTACT US</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
