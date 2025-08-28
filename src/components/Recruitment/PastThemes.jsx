import React from 'react';
import '../../styles/Recruitment/PastThemes.css';

const PastThemes = () => {
  const photos = [
    '/assets/squidgame.png',
    '/assets/wonka.png',
    '/assets/tuneIn.png',
    '/assets/bond.png'
  ];

  return (
    <div className="photo-grid">
      <h2 className="previous-themes-title">Previous Themes</h2>
      <div className="photo-grid-container">
        {photos.map((photo, idx) => (
          <div key={idx} className="photo-grid-box">
            <img src={photo} alt={`Theme ${idx + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastThemes;