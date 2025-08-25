// AlumniClass.jsx
import React from 'react';
import { chapters } from './data';
import '../../styles/Alumni/AlumniClass.css';

const AlumniClass = () => (
  <main className="chapters-container">
    {chapters.map((chapter) => (
      <section key={chapter.name} className="chapter-section">
        <h2 className="chapter-name">{chapter.name}</h2>
        
        {/* Mobile roster view */}
        <div className="mobile-roster">
          {chapter.members.map((member) => (
            <div key={member.id} className="roster-item">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="roster-link"
              >
                {member.name} - Class of {member.classYear}
              </a>
            </div>
          ))}
        </div>

        {/* Desktop grid view */}
        <div className="members-grid">
          {chapter.members.map((member) => (
            <div key={member.id} className="member-wrapper">
              <div className="member-photo">
                <img
                  className="photo"
                  src={member.imageUrl}
                  alt={member.name}
                />
                <div className="photo-overlay">
                  <p className="overlay-name">{member.name}</p>
                  <p>Class: {member.classYear}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="overlay-link"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    ))}
  </main>
);

export default AlumniClass;
