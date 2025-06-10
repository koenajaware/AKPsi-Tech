import React from "react";
import Journey from "./Journey";
import MsgPresident from "./MsgPresident";
import AboutBanner from "./AboutBanner";
import SponsorGallery from "./SponsorGallery/SponsorGallery";

const AboutPage = () => {
    return (
      <div className="about-page">
        <header></header>
        <AboutBanner></AboutBanner>
        <MsgPresident></MsgPresident>
        <Journey></Journey>
        <SponsorGallery></SponsorGallery>
      </div>
    );
  };
  
  export default AboutPage;