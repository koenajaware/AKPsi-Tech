import React, { useEffect, useState } from 'react';
import { motion as Motion, useScroll, useTransform } from 'framer-motion';
import '../../styles/Contact/contact.css';
import ContactImage from '../../assets/ContactUsCover.png'; 

const ContactPage = () => {
  return (
    <div
      className="contact-page-container"
      style={{ backgroundImage: `url(${ContactImage})` }}
    >
      <div className="contact-overlay">
        <div className="contact-content">
          <h1>CONTACT US</h1>
          <div className="contact-body">
            <div className="contact-details">
              <div className="contact-person">
                <h2>Sydney Richman</h2>
                <p>President</p>
                <a href="mailto:president.akpsiot@gmail.com">
                  president.akpsiot@gmail.com
                </a>
              </div>
              <div className="contact-person">
<<<<<<< HEAD
                <h2>Abhiram Sreeramaneni</h2>
                <p>Vice President of Membership</p>
                <a href="mailto:akpsiotrush@gmail.com">akpsiotrush@gmail.com</a>
              </div>
              <div className="contact-person">
                <h2>Alpha Kappa Psi</h2>
                <p>Omega Theta Chapter</p>
                <a href="mailto:akpsiomegatheta@gmail.com">akpsiomegatheta@gmail.com</a>
              </div>
=======
                <h2>Abhiram Sriramaneni</h2>
                <p>Vice President of Membership</p>
                <a href="mailto:akpsiotrush@gmail.com">akpsiotrush@gmail.com</a>
              </div>
>>>>>>> f1f7a63c4a5e09bef6a4c4648489d6d3056b6a27
            </div>
            <div className="contact-form-container">
              <form action="#" method="POST"> {/* NOTE: I need the form handling logic to go here (like the URL) */}
                <input type="text" name="fullName" placeholder="Full Name" required />
                <input type="email" name="email" placeholder="Email Address" required />
                <input type="text" name="subject" placeholder="Subject Line" required />
                <textarea name="message" placeholder="Message" rows="6" required></textarea>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;