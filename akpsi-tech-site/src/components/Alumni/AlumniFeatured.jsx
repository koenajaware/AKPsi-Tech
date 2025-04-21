// AlumniFeatured.jsx
import React, { useState } from 'react';
import '../../styles/Alumni/AlumniFeatured.css';

const AlumniFeatured = ({ items }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const toggle = idx => setExpandedIndex(expandedIndex === idx ? null : idx);

  return (
    <section className="featured-alumni-section">
      <h2 className="section-title">Featured Alumni</h2>
      <div className="alumni-list">
        {items.map((alum, idx) => (
          <div key={alum.name} className="alumni-item">
            <div className="alumni-summary" onClick={() => toggle(idx)}>
              <img src={alum.photo} alt={alum.name} className="alumni-photo" />
              <div className="alumni-info">
                <span className="alumni-name">{alum.name}</span>
                <span className="alumni-role">{alum.role}</span>
              </div>
              <div className="alumni-toggle-icon">
                {expandedIndex === idx ? '−' : '+'}
              </div>
            </div>

            {expandedIndex === idx && (
              <div className="alumni-details">
                <div className="alumni-class">{alum.classYear}</div>
                <div className="alumni-logo-container">
                  <img src={alum.logo} alt={`${alum.name} logo`} className="company-logo" />
                  <p className="company-description">{alum.companyDescription}</p>
                </div>
                <div className="alumni-quote">
                  <p className="quote-title">Why Alpha Kappa Psi?</p>
                  <p className="quote-text">{alum.quote}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlumniFeatured;