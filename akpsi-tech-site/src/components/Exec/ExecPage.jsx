import React from 'react';
import '../../styles/Exec/ExecPage.css';
import Footer from '../Footer/Footer';

const ExecPage = () => {
  // Executive data (unchanged)
  const executives = [
    { 
        name: "Sydney Richman", 
        position: "President",
        description: "Bachelor's in Computer Science and Economics",
        additional: "Executive Board Member",
        image: "/assets/sydney.jpg" 
      },
    { 
      name: "João Eduardo Camargo de Miranda", 
      position: "Chief of Staff",
      description: "Bachelor's in Government and Politics, International Business",
      additional: "Executive Board Member",
      image: "/assets/joao.jpg" 
    },
    { 
      name: "Mallika Bhat", 
      position: "Bachelor's in Operations Management and Business Analytics",
      description: "B.S. in Information Systems & Marketing",
      additional: "Executive Board Member", 
      image: "/assets/mallika.jpg" 
    },
    { 
      name: "Rahul Harish", 
      position: "Controller",
      description: "Bachelor's in Computer Science and Statistics",
      additional: "Executive Board Member", 
      image: "/assets/rahul.jpg" 
    },
    { 
      name: "Abhiram Sreeramaneni", 
      position: "VP Membership",
      description: "Bachelor's in Philosophy, Politics, Economics, Social Data Science",
      additional: "Executive Board Member", 
      image: "/assets/abhis.jpg" 
    },
    { 
      name: "Alma Hagstrom", 
      position: "VP Finance",
      description: "B.S. in Computer Science and Finance",
      additional: "Executive Board Member", 
      image: "/assets/alma.jpg" 
    },
    { 
      name: "Walid Khokhar", 
      position: "VP Professional",
      description: "Bachelor's in Finance and Information Systems",
      additional: "Executive Board Member", 
      image: "/assets/walid.jpg" 
    },
    { 
      name: "Arsha Garg", 
      position: "VP Pledging",
      description: "Bachelor's in Computer Science",
      additional: "Executive Board Member", 
      image: "/assets/arsha.jpg" 
    },
    { 
      name: "Uzochi Njiaju", 
      position: "VP Community Service",
      description: "Bachelor's in Information Systems",
      additional: "Executive Board Member", 
      image: "/assets/uzochi.jpg" 
    },
    { 
      name: "Avni Kaushik", 
      position: "VP Alumni Affairs",
      description: "B.S. in Computer Science and Neuroscience",
      additional: "Executive Board Member", 
      image: "/assets/avni.jpg" 
    },
    { 
      name: "Ethan Grossman", 
      position: "Master of Rituals",
      description: "Bachelor's in Finance & Information Systems",
      additional: "Executive Board Member", 
      image: "/assets/ethan.jpg" 
    },
    { 
      name: "Emily Craig", 
      position: "VP Diversity, Equity, and Inclusion",
      description: "Bachelor's in Politics, Philosophy, Economics, and Business Management",
      additional: "Executive Board Member", 
      image: "/assets/emily.jpg" 
    },

  ];

  const handleImageError = (e) => {
    e.target.src = `https://via.placeholder.com/150?text=${e.target.alt.charAt(0)}`;
  };

  return (
    <div className="exec-page">
      {/* Simple banner with no scrolling effect */}
      <div className="exec-banner">
        <img 
          src="/assets/exec-banner.png" 
          alt="Executive Board Group Photo" 
          className="exec-banner-image"
          onError={(e) => e.target.style.display = 'none'}
        />
        <div className="exec-banner-overlay">
          <h1 className="exec-page-title">EXECUTIVE BOARD</h1>
        </div>
      </div>
      
      {/* Executive cards section */}
      <div className="exec-content">
        {executives.map((exec, index) => (
          <div className="exec-card" key={index}>
            <div className={`exec-card-content ${index % 2 === 0 ? 'left-image' : 'right-image'}`}>
              <div className="exec-card-text">
                <h2 className="exec-position">{exec.position}</h2>
                <h3 className="exec-name">{exec.name}</h3>
                <p className="exec-description">{exec.description}</p>
                <p className="exec-additional">{exec.additional}</p>
              </div>
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
        ))}
      </div>
      

    </div>
  );
};

export default ExecPage; 