import React from 'react';
import '../../styles/About/AboutHistory.css';
import foundersImage from '../../assets/History.png'; 

const AboutHistory = () => {
  return (
    <section className="history-section">
      <h2 className="history-title">History</h2>
      <div className="history-content">
        <img
          src={foundersImage}
          alt="Alpha Kappa Psi founders"
          className="history-image"
        />
        <div className="history-text">
          <p>
            Alpha Kappa Psi is the oldest and largest professional business fraternity,
            founded in 1904 by the “Brooklyn Four” with the mission to develop
            principled business leaders. With a legacy spanning over a century,
            Alpha Kappa Psi has grown to include over 260,000 alumni across more than
            300 chapters in three countries and two continents.
          </p>
          <p>
            Rooted in core values such as brotherhood, integrity, service, unity, and
            knowledge, the fraternity fosters a diverse community of students from all
            academic backgrounds.
          </p>
          <p>
            Through a network of students, professors, graduates, and professionals,
            Alpha Kappa Psi offers unmatched opportunities for professional
            development, leadership, and lifelong friendship.
          </p>
          <p>
            Members of Alpha Kappa Psi are united by a shared commitment to
            personal and professional growth. The fraternity’s programs are designed to
            prepare students to succeed in a rapidly changing world, equipping them
            not only with business acumen, but also with the values and support system
            needed to thrive long after college.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHistory;