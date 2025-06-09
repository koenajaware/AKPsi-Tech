import React from "react";
import "../../styles/About/MsgPresident.css";

export default function MsgPresident() {
  return (
    <section className="msg-president">
      {/* Corner accents */}
      <div className="corner top-left" />
      <div className="corner bottom-right" />

      {/* Title */}
      <h2 className="mp-title">Letter from our President</h2>

      {/* Greeting */}
      <p className="mp-greeting">Dear Prospective Rush,</p>

      {/* Body copy */}
      <div className="mp-body-wrapper">
        <div className="mp-body">
          <p>
            On behalf of the Omega Theta chapter, I would like to welcome you to
            our official website where you can learn all about who we are and
            what our rush process is like. Our site gives you a glimpse into who
            we are as a chapter and the values that we hold: Brotherhood,
            Professionalism, and Service.
          </p>
          <p>
            Alpha Kappa Psi is one of the oldest and largest business
            fraternities in the country, with over 200 chapters worldwide. Our
            individual chapter, Omega Theta, is one of the largest professional
            fraternities on the University of Maryland’s campus. Even so, our
            chapter is dedicated to every individual member’s professional and
            personal growth.
          </p>
          <p>
            Our diversity allows us to stand out from other business
            fraternities on campus. Omega Theta is comprised of members from
            over 20 different majors, from over 7 different countries. Our
            worldwide professional network explores all fields of business and
            more. We work together to provide the right tools and resources that
            will take you beyond what you thought possible.
          </p>
          <p>
            This Spring 2025, our rush theme is 'Squid Game'! I highly encourage
            you to take a chance, have confidence, and come out to our rush
            events this semester. The Brothers of Alpha Kappa Psi cannot wait to
            meet you!
          </p>
          
        </div>
        {/* Signature */}
        <p className="mp-signature">– Sydney Richman</p>
      </div>

      
    </section>
  );
}
