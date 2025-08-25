import React, { useState } from 'react';
import '../../styles/Recruitment/RecruitmentTipsGallery.css';

const RecruitmentTipsGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const tipsData = [
    {
      id: 1,
      question: "WHAT IS ALPHA KAPPA PSI?",
      answer: "Alpha Kappa Psi is the oldest and largest international professional co-ed business fraternity. Our purpose is to develop our members into principled business leaders. We are the Omega Theta chapter and there are a total of 268 active chapters worldwide!"
    },
    {
      id: 2,
      question: "HOW CAN I PREPARE FOR RECRUITMENT?",
      answer: "Make sure you follow our Instagram, LinkedIn and our other social media platforms for all of the updates, events, and information. Dress code, room number, and dates will also be listed on our infographics. Make sure to register yourself on our form once it comes out. It will require your personal information, headshot, and resume."
    },
    {
      id: 3,
      question: "HOW MANY EVENTS ARE REQUIRED?",
      answer: "Try to attend as many events as you can for the entirety of the time. We recommend attending our Interfrat Panel, Info Night, and Community Service Night. Our invite only events must be attended."
    },
    {
      id: 4,
      question: "WHAT ARE THE TIME COMMITMENTS?",
      answer: "As an active member, you’ll attend weekly chapter meetings and participate in professional development events, community service projects, and social activities. We understand the importance of academic priorities and strive to help members balance their commitments."
    },
    {
      id: 5,
      question: "WHAT ARE THE BENEFITS OF JOINING?",
      answer: "Members will gain access to professional networking opportunities, leadership development, career resources, lifelong friendships, and exclusive events with industry professionals and alumni."
    },
    {
      id: 6,
      question: "HOW MUCH DOES IT COST?",
      answer: "There are membership dues that cover chapter operations, events, and national fees. We offer payment plans and scholarship opportunities to ensure finances don't prevent qualified candidates from joining."
    }
  ];

  // Total slides = 1 (did you know) + tips length
  const totalSlides = tipsData.length + 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="recruitment-tips-gallery">
      {/* Section Header */}
      <h2 className="section-title">RECRUITMENT TIPS</h2>

      {/* Tips Slider */}
      <div className="tips-slider-container">
        <button className="slider-arrow slider-arrow-left" onClick={prevSlide} aria-label="Previous slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="tips-slider">
          <div 
            className="tips-track" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* First slide - DID YOU KNOW */}
            <div className="tip-slide">
              <div className="tip-card did-you-know-card">
                <div className="did-you-know-content">
                  <h2 className="did-you-know-title">DID YOU KNOW?</h2>
                  <div className="did-you-know-bubble">
                    <p>Alpha Kappa Psi-Omega Theta Recruitment's most Frequently Asked Questions!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ slides */}
            {tipsData.map((tip) => (
              <div key={tip.id} className="tip-slide">
                <div className="tip-card">
                  <div className="tip-number">
                    <span>{tip.id.toString().padStart(2, '0')}</span>
                  </div>
                  <div className="tip-content">
                    <h3 className="tip-question">{tip.question}</h3>
                    <p className="tip-answer">{tip.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="slider-arrow slider-arrow-right" onClick={nextSlide} aria-label="Next slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="slider-dots">
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={index === 0 ? 'Go to intro slide' : `Go to tip ${index}`}
          />
        ))}
      </div>
    </section>
  );
};

export default RecruitmentTipsGallery; 