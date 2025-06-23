import React from "react";
import "../../styles/Home/Sponsors.css";

const Sponsors = () => {
  return (
    <div className="blue-bar">
      <h2 className="sponsor-header">Sponsors</h2>
      <div className="sponsor-slider">
        <div className="sponsor-track">
          <img src="/assets/sponsors/CapitalOne.png" alt="Capital One" />
          <img src="/assets/sponsors/EY.png"  alt="EY" />
          <img src="/assets/sponsors/Crowe.png" alt="Crowe" />
          <img src="/assets/sponsors/KPMG.png" alt="KPMG" className="kpmg"/>
          {/* <img src="/sponsors/sponsor5.png" alt="Sponsor 5" /> */}
          {/* Duplicate logos for continuous scrolling */}
          <img src="/assets/sponsors/CapitalOne.png" alt="Capital One" />
          <img src="/assets/sponsors/EY.png" alt="EY" />
          <img src="/assets/sponsors/Crowe.png" alt="Crowe" />
          <img src="/assets/sponsors/KPMG.png" alt="KPMG" className="kpmg"/>
          {/* <img src="/sponsors/sponsor5.png" alt="Sponsor 5" /> */}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
