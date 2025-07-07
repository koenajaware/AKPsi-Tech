import React from 'react';
import '../../styles/Recruitment/Recruitment.css'; // import your CSS
import RecruitmentBanner from './RecruitmentBanner';
import RecruitmentLetter from './RecruitmentLetter';
import RecruitmentSignup from './RecruitmentSignup';
import RecruitmentEvents from './RecruitmentEvents';
import RecruitmentPhotoWheel from './RecruitmentPhotoWheel';
import Tip from './Tips';
import PastThemes from './PastThemes';


const RecruitmentPage = () => {
  return (
    <div className="recruitment-page">
      <header>
        <RecruitmentBanner />
      </header>
      <main>
          <RecruitmentLetter />
          <RecruitmentSignup />
          <RecruitmentEvents />
          <Tip />
          <RecruitmentPhotoWheel />
          <PastThemes />
      </main>
    </div>
  );
};

export default RecruitmentPage;