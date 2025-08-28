import React, { useState } from 'react';
import '../../styles/Home/Pillars.css';

const Pillars = () => {
  const [expandedPillars, setExpandedPillars] = useState([]);

  const pillars = [
    { 
      title: "Brotherhood", 
      image: "https://placehold.co/400x300?text=Brotherhood",
      content: "When the day comes that we have to leave our beloved University of Maryland behind, the brothers of Alpha " +
        "Kappa Psi will leave as some of the most prepared, well-rounded individuals to enter the professional world. We " +
        "offer our members the unique opportunity to take part in professional events hosted by companies such as Deloitte, " +
        "Grant Thornton, Geico, Lockheed Martin, Northwestern Mutual, and more. We have seen first hand the processes of " +
        "a business environment through office tours, listened to company representatives talk to us about what they do and " +
        "offer us advice for the future, and learned important life lessons that extend beyond the workplace from our " +
        "guest speakers. All of this creates an experience that sets Alpha Kappa Psi apart from other fraternities by " +
        "truly preparing us for the future, so that when we enter that new chapter of our lives after graduating, we " +
        "enter with unparalleled experience, leadership, and confidence."
    },
    { 
      title: "Community Service", 
      image: "https://placehold.co/400x300?text=Community+Service",
      content: "Besides instilling a sense of professionalism in our members, we also enjoy giving back to the community " +
        "through a variety of community service events. Every year, we participate in Relay for Life in support of cancer " +
        "research. We have raised money for Alzheimer's research by participating in an annual Coldstone ice cream eating " +
        "contest, and we have also gone on work trips with Habitat for Humanity to build houses in the Baltimore area. In " +
        "addition, we frequently volunteer at animal shelters, the Ronald McDonald House, and the Shepherd's Table soup " +
        "kitchen. Other service activities include working security for the Baltimore Ravens, participating in the Making " +
        "Strides Against Breast Cancer walk, playing in charity sports tournaments, and making gift bags for children " +
        "during the holiday season."
    },
    { 
      title: "Social", 
      image: "https://placehold.co/400x300?text=Social",
      content: "The brothers of Alpha Kappa Psi are athletes, rocket scientists, musicians, politicians, and yes, college " +
        "students. We certainly have a social aspect to our fraternity that builds a strong bond between our members and " +
        "fosters a friendship that lasts a lifetime. We hold an array of social activities such as football game day " +
        "tailgates, semi annual formals, annual brotherhood retreats, and intramural athletics in just about every sport " +
        "possible. Even though we're all a little different in our own ways, the brothers of Alpha Kappa Psi are all " +
        "united together by sharing the same professional goals for the future, a brotherhood that knows no bounds, and a " +
        "passion for Terps basketball that might be a little unhealthy."
    }
  ];

  const togglePillar = (index) => {
    setExpandedPillars(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <section className="pillars" id="pillars">
      <h2 className="pillars-section-title">PILLARS</h2>
      
      <div className="pillars-content">
        <div className="pillars-list">
          {pillars.map((pillar, index) => (
            <div className="pillar-container" key={index}>
              <div 
                className="pillar-item" 
                onClick={() => togglePillar(index)}
              >
                <h3 className="pillar-title">{pillar.title}</h3>
                <div className="expand-icon">
                  {expandedPillars.includes(index) ? '−' : '+'}
                </div>
              </div>
              {expandedPillars.includes(index) && (
                <div className="pillar-dropdown">
                  <p>{pillar.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="pillars-cards">
          {pillars.map((pillar, index) => (
            <div className="pillar-card" key={index}>
              <img src={pillar.image} alt={pillar.title} className="pillar-image" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;