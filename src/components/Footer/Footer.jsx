import React from 'react';
import '../../styles/Footer/Footer.css'; // Make sure to create this CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-overlay"></div>
      <div className="footer-content">
        <h2 className="footer-logo">AKΨ</h2>
        <div className="social-icons">
          <a href="https://www.linkedin.com/company/akpsiot/" target="_blank" rel="noopener noreferrer" className="social-icon-link">
            <div className="social-icon linkedin-icon">in</div>
          </a>
          <a href="https://www.instagram.com/akpsiot/" target="_blank" rel="noopener noreferrer" className="social-icon-link">
            <div className="social-icon instagram-icon">
              <span className="instagram-inner"></span>
            </div>
          </a>
          <a href="https://www.tiktok.com/@umdakpsi" target="_blank" rel="noopener noreferrer" className="social-icon-link">
            <div className="social-icon">
              <img src="/assets/tiktok.png" alt="TikTok" className="tiktok-logo" />
            </div>
          </a>
        </div>
        <p className="copyright">
          Copyright © 2025 Alpha Kappa Psi Omega Theta. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 