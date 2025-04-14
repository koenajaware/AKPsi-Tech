import React from 'react';
import { chapters } from './data'; // import your data array
import '../../styles/Brother/BrotherPage.css'; // import your CSS
import BrotherBanner from './BrotherBanner';

const BrotherPage = () => {
  return (
    <div className="brother-page">
      <header>
        <BrotherBanner />
      </header>

      {/* 2. Main Content */}
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

      {/* 3. Footer */}
      <footer className="footer-container">
        <p>© 2025 Your Organization. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BrotherPage;
