import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../../styles/Exec/ExecPage.css';
import Footer from '../Footer/Footer';

const ExecPage = () => {
  // Executive data (unchanged)
  const executives = [
    { 
        name: "Jason Jia", 
        position: "President",
        description: "B.S. in Finance",
        additional: "Executive Board Member",
        image: "/assets/sydney.jpg" 
      },
      { 
        name: "Alma Hagstrom", 
        position: "Executive Vice President",
        description: "B.S. in Computer Science and Finance",
        additional: "Executive Board Member", 
        image: "/assets/mallika.jpg" 
      },
    { 
      name: "Patrick Zhang", 
      position: "Chief of Staff",
      description: "B.S. in Computer Science and Finance",
      additional: "Executive Board Member",
      image: "/assets/joao.jpg" 
    },
    { 
      name: "Riyana Patel", 
      position: "Controller",
      description: "B.S. in Finance and Supply Chain Management",
      additional: "Executive Board Member", 
      image: "/assets/rahul.jpg" 
    },
    { 
      name: "Hashem Alomar", 
      position: "VP Membership",
      description: "B.S. in Computer Science and Math",
      additional: "Executive Board Member", 
      image: "/assets/abhis.jpg" 
    },
    { 
      name: "Jack Mason", 
      position: "VP Finance",
      description: "B.S. in Finance",
      additional: "Executive Board Member", 
      image: "/assets/alma.jpg" 
    },
    { 
      name: "Nidhin Gangisetty", 
      position: "VP Professional",
      description: "B.S. in Computer Science and Minor in Robotics and Entrepreneurship",
      additional: "Executive Board Member", 
      image: "/assets/walid.jpg" 
    },
    { 
      name: "Arun Crispino", 
      position: "VP Pledging",
      description: "B.S. in Computer Science and Finance",
      additional: "Executive Board Member", 
      image: "/assets/arsha.jpg" 
    },
    { 
      name: "Vaishnavi Banda", 
      position: "VP Community Service",
      description: "B.S. in Computer Science and Finance",
      additional: "Executive Board Member", 
      image: "/assets/uzochi.jpg" 
    },
    { 
      name: "Linh Ngo", 
      position: "VP Alumni Affairs",
      description: "B.S. in Economics",
      additional: "Executive Board Member", 
      image: "/assets/avni.jpg" 
    },
    { 
      name: "Ryan Krucenski", 
      position: "Master of Rituals",
      description: "B.S. in Finance and Information Systems",
      additional: "Executive Board Member", 
      image: "/assets/ethan.jpg" 
    },
    { 
      name: "Emely Martinez", 
      position: "VP Diversity, Equity, and Inclusion",
      description: "B.S. in Information Systems and Operational Management and Business Analytics",
      additional: "Executive Board Member", 
      image: "/assets/emily.jpg" 
    },

  ];

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

  const handleImageError = (e) => {
    e.target.src = `https://via.placeholder.com/150?text=${e.target.alt.charAt(0)}`;
  };

  return (
    <div className="exec-page">
      {/* Banner with scrolling effect */}
      <motion.section 
        className="exec-banner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="exec-banner-image-container">
          <motion.div
            style={{ 
              position: "relative", 
              width: "100%", 
              height: "100%", 
              overflow: "hidden" 
            }}
          >
            <motion.img 
              src="/assets/exec-banner.png" 
              alt="Executive Board Group Photo" 
              className="exec-banner-image"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              style={{ 
                y,
                scale,
                transformOrigin: "center center" 
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              onError={(e) => e.target.style.display = 'none'}
            />
          </motion.div>
        </div>
        
        <motion.div 
          className="exec-banner-overlay"
          style={{ opacity }}
        >
          <motion.h1 
            className="exec-page-title"
            initial={{ opacity: 0.7, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Executive Board
          </motion.h1>
        </motion.div>
      </motion.section>
      
      {/* Executive cards section */}
      <div className="exec-content">
        {executives.map((exec, index) => (
          <div className="exec-card" key={index}>
            <div className={`exec-card-content ${index % 2 === 0 ? 'left-image' : 'right-image'}`}>
              <div className="exec-card-text-block">
                <h2 className="exec-position">{exec.position}</h2>
                <h3 className="exec-name">{exec.name}</h3>
                <p className="exec-description">{exec.description}</p>
                <p className="exec-additional">{exec.additional}</p>
              </div>
              <div className="exec-card-image-block">
                <div className="exec-image-container">
                  <img 
                    src={exec.image} 
                    alt={exec.name} 
                    className="exec-image" 
                    onError={handleImageError}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExecPage; 