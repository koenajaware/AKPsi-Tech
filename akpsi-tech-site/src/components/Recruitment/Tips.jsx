import React, { useRef, useState, useEffect } from 'react';
import '../../styles/Recruitment/Tips.css';

const Tips = () => {
  const photos = [
    '/assets/RecruitmentPhoto1.jpeg',
    '/assets/RecruitmentPhoto2.jpeg',
    '/assets/RecruitmentPhoto3.jpeg',
    '/assets/bb67344540950299936d4053fe88d129.jpg',
    '/assets/e739404f89b76a198ba76291ec9bbe87.jpg'
  ];

  const duplicatedPhotos = [...photos, ...photos];
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Width of each photo slide + margin
  const photoWidth = 520; // 500px + 20px margin as per CSS

  useEffect(() => {
    const interval = setInterval(() => {
      if (!trackRef.current) return;
      const style = window.getComputedStyle(trackRef.current);
      const matrix = style.transform || style.webkitTransform;
      if (!matrix || matrix === 'none') {
        setCurrentIndex(0);
        return;
      }

      // matrix is like "matrix(a, b, c, d, tx, ty)"
      const values = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
      const translateX = parseFloat(values[4]);

      // Because translateX is negative as it scrolls left
      const positiveTranslateX = Math.abs(translateX);
      // Loop width is total width of duplicated photos
      const totalWidth = photoWidth * duplicatedPhotos.length;

      // Modulo total width to loop
      const modTranslateX = positiveTranslateX % (totalWidth / 2);

      // Calculate index
      const index = Math.floor(modTranslateX / photoWidth);

      // If index changed, update state (use modulo photos length)
      const newIndex = index % photos.length;
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, photos.length, duplicatedPhotos.length]);

  return (
    <>
      <h2 className="tip-title">Recruitment Tips</h2>
      <div className="tips-section-wrapper">
        <section className="tip-wheel">
          <div
            className="tip-track"
            ref={trackRef}
          >
            {duplicatedPhotos.map((photo, index) => (
              <div key={index} className="photo-slide">
                <img src={photo} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Tips;