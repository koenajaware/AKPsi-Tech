import React from 'react';
import '../../styles/Recruitment/Recruitment.css'; // import your CSS
import RecruitmentBanner from './RecruitmentBanner';

const RecruitmentPage = () => {
  return (
    <div className="brother-page">
      <header>
        <RecruitmentBanner />
      </header>
    </div>
  );
};

export default RecruitmentPage;