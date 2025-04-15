import React from 'react';
import { chapters } from './data'; // import your data array
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
                    <img src={member.imageUrl} alt={member.name} />
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
