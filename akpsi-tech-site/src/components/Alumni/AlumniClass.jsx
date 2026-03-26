// AlumniClass.jsx
import React from 'react';
import { chapters } from './data';
import '../../styles/Alumni/AlumniClass.css';

const allMembers = chapters.flatMap((chapter) =>
  chapter.members.map((member) => ({ ...member, chapterName: chapter.name }))
);

const AlumniClass = () => {
  const allMembers = chapters.flatMap((chapter) =>
    chapter.members.map((member) => ({ ...member, chapterName: chapter.name }))
  );

  return (
    <main className="chapters-container">
      {/* Mobile roster view */}
      <div className="mobile-roster">
        {allMembers.map((member) => (
          <div key={`${member.chapterName}-${member.id}`} className="roster-item">
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="roster-link">
              {member.name} - Class of {member.classYear} - {member.chapterName}
            </a>
          </div>
        ))}
      </div>

      {/* Desktop grid view */}
      <div className="members-grid">
        {allMembers.map((member) => (
          <div key={`${member.chapterName}-${member.id}`} className="member-wrapper">
            <div className="member-photo">
              <img className="photo" src={member.imageUrl} alt={member.name} />
              <div className="photo-overlay">
                <p className="overlay-name">{member.name}</p>
                <p>Class: {member.classYear}</p>
                <p>{member.chapterName}</p>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="overlay-link">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AlumniClass