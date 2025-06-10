import React from "react";
import "../../../styles/About/SponsorGallery/SponsorGallery.css";
import Sponsors from "./Sponsors";

export default function SponsorGallery() {
  return (
    <section className="sponsor-gallery">

      {/* Title */}
      <h2 className="sg-title">Sponsor Gallery</h2>
      
      <Sponsors></Sponsors>

    </section>
  );
}
