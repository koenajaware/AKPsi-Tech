import React, { useEffect, useState } from 'react';
import '../../styles/Recruitment/RecruitmentEvents.css';

const RecruitmentEvents = () => {
  const [windowHeight, setWindowHeight] = useState(0);

//   useEffect(() => {
//     setWindowHeight(window.innerHeight);
//     const handleResize = () => setWindowHeight(window.innerHeight);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//    }, []);

   const events = [
    {
      title: "INTERFRATERNAL PANEL",
      description: "A chance to listen to representatives from all four business fraternities and see which one aligns best with your interests.",
      dressCode: "Presentable Casual"
    },
    {
      title: "INFORMATION NIGHT", 
      description: "Come out and meet the brothers of AKPsi! There will be a short presentation followed by time for you to get to know the brotherhood.",
      dressCode: "Presentable Casual"
    },
    {
      title: "CS & DEI NIGHT",
      description: "Gather around with brothers and help prepare kits filled with necessary items for a shelter in DC, while telling brothers about your passions",
      dressCode: "Presentable Casual"
    },
    {
      title: "OPTIONAL NIGHT",
      description: "Get to know the brotherhood in a more casual atmosphere while having fun.",
      dressCode: "Presentable Casual"
    },
    {
      title: "PROFESSIONAL NIGHT",
      description: "(Invite Only)\nMock interviews where we test how quick you are on your feet.",
      dressCode: "Business Professional"
    },
    {
      title: "CALLBACK NIGHT", 
      description: "(Invite Only)",
      dressCode: "Presentable Casual"
    }
  ];

  return (
    <div className="recruitment-events">
      {/* loop to create each of the events */}
      <div className="events-container">
        <div className="events-grid">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              {/* header of each ebvent*/}
              <div className="event-header">
                <h2 className="event-title">
                  {event.title}
                </h2>
              </div>
              
              {/* content for each event*/}
              <div className="event-content">
                <div className="event-description-area">
                  <p className="event-description">
                    {event.description}
                  </p>
                </div>
                
                {/* dress code fro each event*/}
                <div className="event-dress-code">
                  <span className="dress-code-text">
                    Dress code: <span className="dress-code-link">{event.dressCode}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruitmentEvents;