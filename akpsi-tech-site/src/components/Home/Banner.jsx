import React from 'react';
import '../../styles/Home/Banner.css';
// Placeholder banner image, change to reflect actual banner
const placeholderImage = 'https://placehold.co/600x400?text=Alpha+Kappa+Psi';

// Can also add the rotating footer section with the companies below
const Banner = () => {
  return (
    <section className="hero">
      <div className="hero-image-container">
        <img src={placeholderImage} alt="Alpha Kappa Psi members" className="hero-image" />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">ALPHA KAPPA PSI</h1>
        <p className="hero-subtitle">The Omega Theta Chapter at the University of Maryland - College Park</p>
      </div>
      <div className="decorative-bar"></div>
    </section>
  );
};

export default Banner;