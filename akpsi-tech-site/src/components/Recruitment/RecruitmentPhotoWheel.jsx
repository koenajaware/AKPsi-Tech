import React from 'react';
import '../../styles/Recruitment/RecruitmentPhotoWheel.css';

const RecruitmentPhotoWheel = () => {
  const photos = [
    '/assets/RecruitmentPhoto1.jpeg',
    '/assets/RecruitmentPhoto2.jpeg',
    '/assets/RecruitmentPhoto3.jpeg',
    
    '/assets/rush/DSC06653.JPG',
    '/assets/rush/DSC06610.jpg',
    '/assets/rush/DSC03166.JPG',
    '/assets/rush/DSC03127.JPG',
    '/assets/rush/DSC03126.JPG'
  ];

  // Duplicate the photos array to create seamless loop
  const duplicatedPhotos = [...photos, ...photos];

  return (
    <>
    <h2 className="photo-wheel-title">Recruitment Gallery</h2>
    <section className="photo-wheel">
      <div className="photo-track">
        {duplicatedPhotos.map((photo, index) => (
          <div key={index} className="photo-slide">
            <img src={photo} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
    </>
  );
};

export default RecruitmentPhotoWheel;