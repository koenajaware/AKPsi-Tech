import React from 'react';
import '../../styles/Alumni/AlumniPage.css'; // import your CSS
import AlumniBanner from './AlumniBanner';
import AlumniClass from './AlumniClass';
import AlumniFeatured from './AlumniFeatured';
import { featured } from './featuredAlumniData';

const AlumniPage = () => {
  return (
    <div className="alumni-page">
      <header>
        <AlumniBanner />
      </header>
      <AlumniFeatured items={featured} />
      <AlumniClass />
    </div>
  );
};

export default AlumniPage;
