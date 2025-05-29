import React, { useState, useEffect } from 'react';
import { readFromSheet } from '../../utils/sheets';
import '../../styles/Brother/BrotherClass.css';

const BrotherClass = () => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Reading:');
        const result = await readFromSheet();
        console.log('Data from sheets:', result);
        setChapters(result);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    loadData();
  }, []);

  return (
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
};

export default BrotherClass;