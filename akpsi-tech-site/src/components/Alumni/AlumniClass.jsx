// AlumniClass.jsx
import React from 'react';
import { chapters } from './data';
import '../../styles/Alumni/AlumniClass.css';

const AlumniClass = () => (
  <main className="chapters-container">
    {chapters.map((chapter) => (
      <section key={chapter.name} className="chapter-section">
        <h2 className="chapter-name">{chapter.name}</h2>
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
                  {/* adjust these to whatever fields your data has */}
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
