import React from 'react';
import '../../styles/Brother/BrotherClass.css';

const BrotherClass = ({ chapters }) => (
  <main className="chapters-container">
    {chapters.map((chapter) => (
      <section key={chapter.name} className="chapter-section">
        <h2 className="chapter-name">{chapter.name}</h2>
        <div className="members-grid">
          {chapter.members.map((member) => (
            <div key={member.id} className="member-wrapper">
              <div className="member-photo">
                {member.imageUrl ? (
                  <img
                    className="photo"
                    src={member.imageUrl}
                    alt={member.name}
                  />
                ) : (
                  <div className="photo-placeholder">No photo</div>
                )}
                <div className="photo-overlay">
                  <p className="overlay-name">{member.name}</p>
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
              <p className="member-name">{member.name}</p>
            </div>
          ))}
        </div>
      </section>
    ))}
  </main>
);

export default BrotherClass;