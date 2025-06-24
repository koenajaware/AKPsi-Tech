import React, { useRef, useState } from 'react';
import '../../styles/Recruitment/PastThemes.css';

const PastThemes = () => {
  const photos = [
    '/assets/RecruitmentPhoto1.jpeg',
    '/assets/RecruitmentPhoto2.jpeg',
    '/assets/RecruitmentPhoto3.jpeg',
    '/assets/bb67344540950299936d4053fe88d129.jpg',
    '/assets/e739404f89b76a198ba76291ec9bbe87.jpg'
  ];

  const duplicatedPhotos = [...photos, ...photos];

  const trackRefTop = useRef(null);
  const trackRefBottom = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const photoWidth = 520; // match CSS width + margin

  const maxIndex = photos.length;

  const moveLeft = () => {
    if (currentIndex === 0) return;
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    const translateX = -photoWidth * newIndex;
    if (trackRefTop.current) {
      trackRefTop.current.style.transform = `translateX(${translateX}px)`;
    }
    if (trackRefBottom.current) {
      trackRefBottom.current.style.transform = `translateX(${translateX}px)`;
    }
  };

  const moveRight = () => {
    if (currentIndex === maxIndex - 1) return;
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    const translateX = -photoWidth * newIndex;
    if (trackRefTop.current) {
      trackRefTop.current.style.transform = `translateX(${translateX}px)`;
    }
    if (trackRefBottom.current) {
      trackRefBottom.current.style.transform = `translateX(${translateX}px)`;
    }
  };

  return (
    <div className="photo-wheel">
      <div className="previous-themes-wrapper">
        <h2 className="previous-themes-title">Previous Themes</h2>
        <div className="previous-themes-container">
          <section className="previous-wheel top-wheel">
            <div className="previous-track" ref={trackRefTop}>
              {duplicatedPhotos.map((photo, idx) => (
                <div key={idx} className="photo-slide">
                  <img src={photo} alt={`Top Slide ${idx + 1}`} />
                </div>
              ))}
            </div>
          </section>

          <section className="previous-wheel bottom-wheel">
            <div className="previous-track" ref={trackRefBottom}>
              {duplicatedPhotos.map((photo, idx) => (
                <div key={idx} className="photo-slide">
                  <img src={photo} alt={`Bottom Slide ${idx + 1}`} />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="previous-themes-controls">
          <button onClick={moveLeft} disabled={currentIndex === 0} aria-label="Scroll Left">
            &lt;
          </button>
          <button onClick={moveRight} disabled={currentIndex === maxIndex - 1} aria-label="Scroll Right">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PastThemes;