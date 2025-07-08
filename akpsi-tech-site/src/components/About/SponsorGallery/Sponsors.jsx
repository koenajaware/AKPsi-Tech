import React from "react";
import "../../../styles/About/SponsorGallery/Sponsors.css";

import img1 from "../../../assets/sponsors/DSC03354.JPG";
import img2 from "../../../assets/sponsors/DSC03360.JPG";
import img3 from "../../../assets/sponsors/DSC03377.JPG";
import img4 from "../../../assets/sponsors/DSC03382.JPG";
import img5 from "../../../assets/sponsors/DSC03393.JPG";
import img6 from "../../../assets/sponsors/DSC03395.JPG";
import img7 from "../../../assets/sponsors/DSC03400.JPG";
import img8 from "../../../assets/sponsors/DSC03408.JPG";
import img9 from "../../../assets/sponsors/DSC03410.JPG";
import img10 from "../../../assets/sponsors/DSC03438.JPG";
import img11 from "../../../assets/sponsors/DSC03448.JPG";

const sponsorImages = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11 ,
];

const Sponsors = () => {
  return (
    <div className="about-sponsor-slider">
      <div className="about-sponsor-track">
        {sponsorImages.concat(sponsorImages).map((src, idx) => (
          <img key={idx} src={src} alt={`Sponsor ${idx + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
