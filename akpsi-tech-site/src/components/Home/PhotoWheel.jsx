import React from 'react';
import '../../styles/Home/PhotoWheel.css';

const PhotoWheel = () => {
  const photos = [
    '/assets/2b72359efece076315944f73dd6b457f.jpg',
    '/assets/4d8d01b24b38fc68a33f2a3619771eec.jpg',
    '/assets/8df319cd7e7c4348e365b73fe843dbf7.jpg',
    '/assets/bb67344540950299936d4053fe88d129.jpg',
    '/assets/e739404f89b76a198ba76291ec9bbe87.jpg'
  ];

  // Duplicate the photos array to create seamless loop
  const duplicatedPhotos = [...photos, ...photos];

  return (
    <section className="photo-wheel">
      <div className="photo-track">
        {duplicatedPhotos.map((photo, index) => (
          <div key={index} className="photo-slide">
            <img src={photo} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoWheel; 