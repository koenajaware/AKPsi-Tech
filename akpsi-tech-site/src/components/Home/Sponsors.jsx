import React from "react";
import "../../styles/Home/Sponsors.css";

const Sponsors = () => {
  return (
    <div className="blue-bar">
      <h2>Sponsors</h2>
      <div className="sponsor-slider">
        <div className="sponsor-track">
          <img src="/sponsors/sponsor1.png" alt="Sponsor 1" />
          <img src="/sponsors/sponsor2.png" alt="Sponsor 2" />
          <img src="/sponsors/sponsor3.png" alt="Sponsor 3" />
          <img src="/sponsors/sponsor4.png" alt="Sponsor 4" />
          <img src="/sponsors/sponsor5.png" alt="Sponsor 5" />
          {/* Duplicate logos for continuous scrolling */}
          <img src="/sponsors/sponsor1.png" alt="Sponsor 1" />
          <img src="/sponsors/sponsor2.png" alt="Sponsor 2" />
          <img src="/sponsors/sponsor3.png" alt="Sponsor 3" />
          <img src="/sponsors/sponsor4.png" alt="Sponsor 4" />
          <img src="/sponsors/sponsor5.png" alt="Sponsor 5" />
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
