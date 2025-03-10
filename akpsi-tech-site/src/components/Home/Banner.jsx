import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../../styles/Home/Banner.css';
import fratPic from "../../assets/Home-Frat-Pic.jpeg";

const Banner = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const { scrollY } = useScroll();
  
  // Create more subtle parallax effects
  const y = useTransform(scrollY, [0, windowHeight], [0, 70]); // Reduced movement from 150 to 70
  const opacity = useTransform(scrollY, [0, windowHeight], [1, 0.7]); // Less opacity change
  const scale = useTransform(scrollY, [0, windowHeight], [1, 1.07]); // Reduced scale effect
  
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
    <motion.section 
      className="hero"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="hero-image-container">
        <motion.div
          style={{ 
            position: "relative", 
            width: "100%", 
            height: "100%", 
            overflow: "hidden" 
          }}
        >
          <motion.img 
            src={fratPic} 
            alt="Alpha Kappa Psi members" 
            className="hero-image"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            style={{ 
              y,
              scale,
              transformOrigin: "center center" 
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </motion.div>
      </div>
      
      <motion.div 
        className="hero-content"
        style={{ opacity }}
      >
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          ALPHA KAPPA PSI
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          The Omega Theta Chapter at the University of Maryland - College Park
        </motion.p>
      </motion.div>
    </motion.section>
  );
};

export default Banner;