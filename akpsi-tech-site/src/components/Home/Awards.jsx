import React from 'react';
import '../../styles/Home/Awards.css';

/* Should be rebuilt into a dropdown, as per Figma design */ 

const Awards = () => {
  const awardCategories = [
    "Chapter Awards",
    "Individual Awards",
    "Notable Awards"
  ];

  return (
    <section className="awards" id="awards">
      <h2 className="section-title">AWARDS</h2>
      
      <div className="awards-content">
        <div className="awards-list">
          {awardCategories.map((category, index) => (
            <div className="award-item" key={index}>
              <div className="award-line"></div>
              <h3 className="award-title">{category}</h3>
              <div className="expand-icon">+</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;