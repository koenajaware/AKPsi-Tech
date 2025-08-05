// AlumniClass.jsx
import React from 'react';
import { chapters } from './data';
import '../../styles/Alumni/AlumniClass.css';

const AlumniClass = () => (
  <main className="chapters-container">
    <div className="members-grid">
      {chapters.flatMap((chapter) =>
        chapter.members.map((member) => (
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
        ))
      )}
    </div>
  </main>
);

export default AlumniClass;
