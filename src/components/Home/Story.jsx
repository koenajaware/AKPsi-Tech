import React from 'react';
import '../../styles/Home/Story.css';

// As per Juhi's comment we gotta come up with a way to make this shorter
const Story = () => {
  return (
    <section className="story" id="about">
      <h2 className="section-title">OUR<br />STORY</h2>
      <div className="story-content">
        <p>
          Alpha Kappa Psi first came to the University of Maryland, College Park in the Spring of 2006, when a Brother who had
          transferred from the Lambda Nu Chapter at American University in Washington, DC, started an interest group. After years
          of unsuccessful attempts, this was the catalyst that the Fraternity needed to finally establish itself at Maryland. In
          the Fall of 2006, a Chapter Advisor was named, and the Interest Group had its first Rush events, eventually getting to
          a stable size of around 40 members. Luke Bottorff, the AKPsi Expansion Coordinator for 2006-2007, came to College Park
          and installed the group as the University of Maryland Colony of Alpha Kappa Psi Fraternity on October 26, 2006.
          <br /><br />
          Over the course of the next semester, the Colony prepared its bylaws, hosted professional and social events, passed
          the final exam, and (despite with a few bumps along the way), had its Petition for Charter approved by the Fraternity
          Board of Directors on December 23, 2006. The Colony was installed as the Omega Theta Chapter on January 27, 2007, by
          Fraternity President Dan Stubblefield in a extravagant ceremony attended by national staff, regional officers, other
          chapters, and volunteers.
          <br /><br />
          Two and a half years later, the Omega Theta Chapter was named the 2008-2009 Chapter of the Year at Convention held in
          Orlando, Florida. This was the first time that any AKPsi chapter has been named Chapter of the Year within such a
          short period of time. Now in its current state, Omega Theta boasts a chapter that is approximately 100 members strong.
          Never resting on our laurels, however, we are always seeking to improve so we can be the best brothers we can
          possibly be.
        </p>
      </div>
    </section>
  );
};

export default Story;