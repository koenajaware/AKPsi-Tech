import React, { useEffect, useState } from 'react';
import { motion as Motion, useScroll, useTransform } from 'framer-motion';
import '../../styles/Alumni/AlumniBanner.css';
import AlumniImage from "../../assets/AlumniPage.jpg";

const AlumniBanner = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const { scrollY } = useScroll();

  // Create parallax effects with useTransform
  const y = useTransform(scrollY, [0, windowHeight], [0, 150]);
  const opacity = useTransform(scrollY, [0, windowHeight * 0.8], [1, 0.3]);
  const scale = useTransform(scrollY, [0, windowHeight], [1, 1.15]);

  // Update window height on mount and resize
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Motion.section 
      className="hero"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="hero-image-container">
        <Motion.div
          style={{ 
            position: "relative", 
            width: "100%", 
            height: "100%", 
            overflow: "hidden" 
          }}
        >
          <Motion.img 
            src={AlumniImage} 
            alt="Alpha Kappa Psi members" 
            className="banner-image"  /* updated class name */
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            style={{ 
              y,
              scale,
              transformOrigin: "center center" 
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </Motion.div>
      </div>
      
      <Motion.div 
        className="hero-content"
        style={{ opacity }}
      >
        <Motion.h1 
          className="hero-title"
          initial={{ opacity: 0.7, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Alumni
        </Motion.h1>
      </Motion.div>
    </Motion.section>
  );
};

export default AlumniBanner;
