import React from 'react';
import '../../styles/Brother/BrotherPage.css'; 
import BrotherBanner from './BrotherBanner';
import BrotherClass from './BrotherClass';

const BrotherPage = () => {
  return (
    <div className="brother-page">
      <header>
        <BrotherBanner />
      </header>

      <BrotherClass />
    </div>
  );
};

export default BrotherPage;
