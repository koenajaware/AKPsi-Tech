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
    </div>
  );
};

export default BrotherPage;
