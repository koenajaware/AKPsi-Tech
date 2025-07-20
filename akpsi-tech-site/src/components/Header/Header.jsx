import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Header/Header.css';
import logo from "/assets/Akpsi-emblem.png";

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
        </button>

        {/* Center Logo */}
        <div className="center-section">
          <Link to="/" className="center-logo" onClick={closeMobileMenu}>
            <span className="center-text">OMEGA</span>
            <img src={logo} alt="Alpha Kappa Psi logo" className="logo" />
            <span className="center-text">THETA</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-links desktop-nav">
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/recruitment" className="nav-link">Recruitment</Link>
          <Link to="/exec" className="nav-link">Exec</Link>
          <Link to="/brothers" className="nav-link">Brothers</Link>
          <Link to="/alumni" className="nav-link">Alumni</Link>
        </nav>

        {/* Desktop Contact Button */}
        <div className="right-section">
          <Link to="/contact" className="header-button">CONTACT US</Link>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
          <nav className="mobile-nav">
            <Link to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>About</Link>
            <Link to="/recruitment" className="mobile-nav-link" onClick={closeMobileMenu}>Recruitment</Link>
            <Link to="/exec" className="mobile-nav-link" onClick={closeMobileMenu}>Exec</Link>
            <Link to="/brothers" className="mobile-nav-link" onClick={closeMobileMenu}>Brothers</Link>
            <Link to="/alumni" className="mobile-nav-link" onClick={closeMobileMenu}>Alumni</Link>
            <Link to="/contact" className="mobile-nav-link contact" onClick={closeMobileMenu}>Contact Us</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
