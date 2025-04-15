import React from 'react';
import { chapters } from './data'; // import your data array
import '../../styles/Brother/BrotherPage.css'; // import your CSS
import BrotherBanner from './BrotherBanner';
import BrotherClass from './BrotherClass';

const BrotherPage = () => {
  return (
    <div className="brother-page">
      <header>
        <BrotherBanner />
      </header>

      <BrotherClass />

      {/* 3. Footer */}
      <footer className="footer-container">
        <p>© 2025 Your Organization. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BrotherPage;
