import React, { useState } from 'react';
import '../../styles/About/Journey.css';

const Journey = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const images = [
    '/assets/2b72359efece076315944f73dd6b457f.jpg',
    '/assets/4d8d01b24b38fc68a33f2a3619771eec.jpg',
    '/assets/8df319cd7e7c4348e365b73fe843dbf7.jpg',
    '/assets/bb67344540950299936d4053fe88d129.jpg',
    '/assets/e739404f89b76a198ba76291ec9bbe87.jpg'
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const getImageIndex = (offset) => {
    return (currentSlide + offset + images.length) % images.length;
  };

  return (
    <section className="journey" id="about">
      <h2 className="section-title">Omega Theta's Journey</h2>
      <div className="carousel-container">
         <div className="carousel-gradient left-gradient"></div>
        <div className="carousel-gradient right-gradient"></div>
        <button className="carousel-arrow left-arrow" onClick={prevSlide}>
             &#8249;
        </button>
        <div className="carousel-track">
          <div className="carousel-slide prev-slide">
            <img 
              src={images[getImageIndex(-1)]} 
              alt="Previous slide"
              className="carousel-image"
            />
          </div>
          
          <div className="carousel-slide current-slide">
            <img 
              src={images[currentSlide]} 
              alt={`Journey slide ${currentSlide + 1}`}
              className="carousel-image"
            />
          </div>

          <div className="carousel-slide next-slide">
            <img 
              src={images[getImageIndex(1)]} 
              alt="Next slide"
              className="carousel-image"
            />
          </div>
        </div>
        
        <button className="carousel-arrow right-arrow" onClick={nextSlide}>
          &#8250;
        </button>
      </div>
      
      <div className="journey-text">
        <p>
          Alpha Kappa Psi first came to the University of Maryland, College Park in the Spring of 2006, when a 
          Brother who had transferred from the Lambda Nu Chapter at American University in Washington, DC, started an interest group. After years of unsuccessful attempts, 
          this was the catalyst that the Fraternity needed to finally establish itself at Maryland.
        </p>
      </div>
    </section>
  );
};

export default Journey;