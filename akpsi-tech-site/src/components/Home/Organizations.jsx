import React from 'react';
import '../../styles/Home/Organizations.css';

// Figure out how to do the bubble thing here, might have to change the code 
// below a lot
const Organizations = () => {
  // Array of placeholder organization logos
  const orgLogos = [
    'https://placehold.co/200x100?text=Organization+1',
    'https://placehold.co/200x100?text=Organization+2',
    'https://placehold.co/200x100?text=Organization+3',
    'https://placehold.co/200x100?text=Organization+4',
    'https://placehold.co/200x100?text=Organization+5',
    'https://placehold.co/200x100?text=Organization+6'
  ];

  return (
    <section className="organizations">
      <h2 className="organizations-title">Organizations We Have Impacted</h2>
      <div className="organizations-grid">
        {orgLogos.map((logo, index) => (
          <div className="organization-logo-container" key={index}>
            <img src={logo} alt={`Organization ${index + 1}`} className="organization-logo" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Organizations;