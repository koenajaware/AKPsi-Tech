import React from 'react';
import '../../styles/Recruitment/Recruitment.css'; // import your CSS
import RecruitmentBanner from './RecruitmentBanner';
import RecruitmentLetter from './RecruitmentLetter';

const RecruitmentPage = () => {
  return (
    <div className="brother-page">
      <header>
        <RecruitmentBanner />
        <RecruitmentEvents />
      </header>
      <main>
        <RecruitmentLetter />
      </main>
    </div>
  );
};

export default RecruitmentPage;