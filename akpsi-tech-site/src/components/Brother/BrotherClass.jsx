import React from 'react';
// import { chapters } from './data_with_photos'; // scraper image update
import {chapters} from './data2'; // manual image update
import '../../styles/Brother/BrotherClass.css'; // import your CSS

const BrotherClass = () => (
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