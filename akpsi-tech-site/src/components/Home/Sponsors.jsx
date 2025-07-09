import React from "react";
import "../../styles/Home/Sponsors.css";

const Sponsors = () => {
  return (
    <div className="blue-bar">
      <h2 className="sponsor-header">Sponsors</h2>
      <div className="sponsor-slider">
        <div className="sponsor-track">
          {/* First set */}
          <img src="/assets/sponsors/CapitalOne.png" alt="Capital One" />
          <img src="/assets/sponsors/EY.png"  alt="EY" />
          <img src="/assets/sponsors/Crowe.png" alt="Crowe" />
          <img src="/assets/sponsors/KPMG.png" alt="KPMG"/>
          {/* Second set */}
          <img src="/assets/sponsors/CapitalOne.png" alt="Capital One" />
          <img src="/assets/sponsors/EY.png" alt="EY" />
          <img src="/assets/sponsors/Crowe.png" alt="Crowe" />
          <img src="/assets/sponsors/KPMG.png" alt="KPMG"/>
          {/* Third set */}
          <img src="/assets/sponsors/CapitalOne.png" alt="Capital One" />
          <img src="/assets/sponsors/EY.png" alt="EY" />
          <img src="/assets/sponsors/Crowe.png" alt="Crowe" />
          <img src="/assets/sponsors/KPMG.png" alt="KPMG"/>
          {/* Fourth set */}
          <img src="/assets/sponsors/CapitalOne.png" alt="Capital One" />
          <img src="/assets/sponsors/EY.png" alt="EY" />
          <img src="/assets/sponsors/Crowe.png" alt="Crowe" />
          <img src="/assets/sponsors/KPMG.png" alt="KPMG"/>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
