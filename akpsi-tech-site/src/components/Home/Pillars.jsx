import React from 'react';
import '../../styles/Home/Pillars.css';

const Pillars = () => {
  const pillars = [
    { title: "Brotherhood", image: "https://placehold.co/400x300?text=Brotherhood" },
    { title: "Community Service", image: "https://placehold.co/400x300?text=Community+Service" },
    { title: "Social", image: "https://placehold.co/400x300?text=Social" }
  ];

  return (
    <section className="pillars" id="pillars">
      <h2 className="section-title">PILLARS</h2>
      
      <div className="pillars-content">
        <div className="pillars-list">
          {pillars.map((pillar, index) => (
            <div className="pillar-item" key={index}>
              <div className="pillar-line"></div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <div className="expand-icon">+</div>
            </div>
          ))}
        </div>
        
        <div className="pillars-cards">
          {pillars.map((pillar, index) => (
            <div className="pillar-card" key={index}>
              <img src={pillar.image} alt={pillar.title} className="pillar-image" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;