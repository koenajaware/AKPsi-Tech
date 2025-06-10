import React from 'react';
import '../../styles/Recruitment/Recruitment.css'; // import your CSS
import RecruitmentBanner from './RecruitmentBanner';
import RecruitmentLetter from './RecruitmentLetter';
import RecruitmentSignup from './RecruitmentSignup';
import RecruitmentEvents from './RecruitmentEvents';

const RecruitmentPage = () => {
  return (
    <div className="brother-page">
      <header>
        <RecruitmentBanner />
      </header>
      <main>
        <RecruitmentLetter />
        <RecruitmentSignup />
        <RecruitmentEvents />
      </main>
    </div>
  );
};

export default RecruitmentPage;