import React from 'react';
import data from './data_with_photos.json';  // Adjust relative path accordingly
import '../../styles/Brother/BrotherPage.css'; 
import BrotherBanner from './BrotherBanner';
import BrotherClass from './BrotherClass';

const BrotherPage = () => {
  const { chapters } = data;

  return (
    <div className="brother-page">
      <header>
        <BrotherBanner />
      </header>

      <BrotherClass chapters={chapters} />
    </div>
  );
};

export default BrotherPage;
