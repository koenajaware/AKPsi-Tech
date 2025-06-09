import React from "react";
import Journey from "./Journey";
import MsgPresident from "./MsgPresident";
import AboutBanner from "./AboutBanner";

const AboutPage = () => {
    return (
      <div className="about-page">
        <header></header>
        <AboutBanner></AboutBanner>
        <MsgPresident></MsgPresident>
        <Journey></Journey>
      </div>
    );
  };
  
  export default AboutPage;