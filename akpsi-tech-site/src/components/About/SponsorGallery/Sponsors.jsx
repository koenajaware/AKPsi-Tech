import React from "react";
import "../../../styles/About/SponsorGallery/Sponsors.css";
import solidGray from '../../../assets/sponsors/solid_gray.png';
import capOne from '../../../assets/sponsors/capital-one-logo.png'


const Sponsors = () => {
  return (
    <div className="sponsor-slider">
      <div className="sponsor-track">
        <img src={capOne} />
        <img src={solidGray} />
        <img src={solidGray} alt="Sponsor 3" />
        <img src={solidGray} alt="Sponsor 4" />
        {/* Duplicate logos for continuous scrolling */}
        <img src={capOne} alt="Sponsor 1" />
        <img src={solidGray} alt="Sponsor 2" />
        <img src={solidGray} alt="Sponsor 3" />
        <img src={solidGray} alt="Sponsor 4" />
      </div>
    </div>
  );
};

export default Sponsors;
