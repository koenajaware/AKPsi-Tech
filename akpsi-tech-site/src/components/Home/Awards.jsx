import React, { useState } from 'react';
import '../../styles/Home/Awards.css';

/* Should be rebuilt into a dropdown, as per Figma design */ 
/* Also make it so that the dropdown stays open when you click on the next dropdown */

const Awards = () => {
  const [expandedAwards, setExpandedAwards] = useState([]);

  const awards = [
    { 
      title: "Chapter Awards",
      content: [
        {
          name: "Chapter of the Year",
          description: "The Alpha Kappa Psi Chapter of the Year is awarded to the chapter within the organization that best delivers the vision of the fraternity: \"Alpha Kappa Psi is recognized as the premier developer of principled business leaders.\" The Chapter of the Year is the \"leader of the pack\" and a true model chapter for other AKPsi chapters.",
          years: {
            circles: [
              { year: "2008/2009", filled: true },
              { year: "2010/2011", filled: true }
            ]
          }
        },
        {
          name: "First Place Fraternity Standing",
          description: "There is a points system within AKPsi in which Chapters must register all their events and attendance (such as: Social, Community Service, and Professional). This award is received only by the Chapter which obtains the most points - an honor the entire Brotherhood must work to achieve.",
          years: {
            circles: [
              { year: "2008", outlined: true },
              { year: "2009", outlined: true },
              { year: "2011", outlined: true }
            ]
          }
        }
      ]
    },
    { 
      title: "Individual Awards",
      content: [
        {
          name: "Helping Hand Award - Phil Caldarella '07",
          description: "This award is given to a Brother who leads by example in the area of service to others. This person recognizes the selflessness of giving ones time to benefit others and this award is only given to a person whom the community feels created real change."
        },
        {
          name: "Helping Hand Award - Brian Perry '08",
          description: "This award is given to a Brother who leads by example in the area of service to others. This person recognizes the selflessness of giving ones time to benefit others and this award is only given to a person whom the community feels created real change."
        },
        {
          name: "Member of the Year Award - Brianne Macy '08",
          description: "The Member of the Year is awarded to the Alpha Kappa Psi brother who is not only involved with AKPsi but other organizations on campus and in the community. This brother truly knows the meaning of time management and knows how to impact many organizations at one time. This brother gives equally of their time to all that they are involved in."
        },
        {
          name: "Kappa Award - Laura Millavec '09",
          description: "For her outstanding efforts in recruitment and membership development as recognised by a regional committee."
        }
      ]
    },
    { 
      title: "Notable Awards",
      content: [
        {
          name: "Distinguished Service Awards",
          description: "The Alpha Kappa Psi Distinguished Service Award (DSA) is the most prestigious award conferred upon our members. To be recognized with a DSA, a member in good standing must have performed praiseworthy service to a chapter, region, fraternity or foundation.",
          subsections: {
            bronze: {
              title: "Bronze Award",
              recipients: [
                "Andrew Levine '07",
                "Jeremy Stark '09",
                "Bill Ke '11",
                "Jane Azzinaro '12",
                "Stephanie Johnson '13",
                "Diana Keung '19"
              ]
            },
            silver: {
              title: "Silver Award",
              recipients: [
                "Sashwata Goswami '11",
                "Nicholas Rust '13"
              ]
            }
          }
        },
        {
          name: "Academy Alumni",
          description: "",
          recipients: [
            "Nicholas Rust '08",
            "Dmitriy Portnyagin '09",
            "Kelsey Cohen '10",
            "Stephanie Johnson '11",
            "Jane Azzinaro '12"
          ]
        },
        {
          name: "Other Notable Awards",
          description: "",
          achievements: [
            "Omega Theta won 2008-2009 International Chapter of the Year at our annual Convention",
            "2011 KPMG National Case Competition in NYC: AKPsi team won both the UMD and the Mid-Atlantic Region rounds",
            "2011 Wake Forest Marketing Competition: Brett Cullen helped the UMD team win 3rd place"
          ]
        }
      ]
    }
  ];

  const toggleAward = (index) => {
    setExpandedAwards((prevExpandedAwards) => {
      if (prevExpandedAwards.includes(index)) {
        return prevExpandedAwards.filter((i) => i !== index);
      } else {
        return [...prevExpandedAwards, index];
      }
    });
  };

  return (
    <section className="awards" id="awards">
      <h2 className="section-title">AWARDS</h2>
      
      <div className="awards-content">
        <div className="awards-list">
          {awards.map((award, index) => (
            <div className="award-container" key={index}>
              <div 
                className="award-item" 
                onClick={() => toggleAward(index)}
              >
                <h3 className="award-title">{award.title}</h3>
                <div className="expand-icon">
                  {expandedAwards.includes(index) ? '−' : '+'}
                </div>
              </div>
              {expandedAwards.includes(index) && (
                <div className="award-dropdown">
                  {!Array.isArray(award.content) ? (
                    <p>{award.content}</p>
                  ) : (
                    award.content.map((item, i) => (
                      <div key={i} className="chapter-award">
                        <h4 className="award-name">
                          <span className="award-title-bold">{item.name}</span>
                        </h4>
                        <p className="award-description-centered">{item.description}</p>
                        {item.years && (
                          <div className="circles-container">
                            {item.years.circles.map((circle, idx) => (
                              <div 
                                key={idx} 
                                className={`year-circle ${circle.filled ? 'filled' : ''} ${circle.outlined ? 'outlined' : ''}`}
                              >
                                {circle.year}
                              </div>
                            ))}
                          </div>
                        )}
                        {item.recipients && (
                          <ul className="recipients-list">
                            {item.recipients.map((recipient, idx) => (
                              <li key={idx}>{recipient}</li>
                            ))}
                          </ul>
                        )}
                        {item.achievements && (
                          <ul className="achievements-list">
                            {item.achievements.map((achievement, idx) => (
                              <li key={idx}>{achievement}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;