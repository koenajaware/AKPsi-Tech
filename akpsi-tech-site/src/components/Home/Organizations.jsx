import React from 'react';
import '../../styles/Home/Organizations.css';
import LogoPhysics from '../LogoPhysics';

const Organizations = () => {
  const orgLogos = [
    'https://placehold.co/200x100?text=Organization+1',
    'https://placehold.co/200x100?text=Organization+2',
    'https://placehold.co/200x100?text=Organization+3',
    'https://placehold.co/200x100?text=Organization+4',
    'https://placehold.co/200x100?text=Organization+5',
    'https://placehold.co/200x100?text=Organization+6'
  ];

  return (
    <section className="organizations">
      <LogoPhysics logos={orgLogos} />
    </section>
  );
};

export default Organizations;