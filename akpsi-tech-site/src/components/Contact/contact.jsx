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
                <h2>Abhiram Sriramaneni</h2>
                <p>Vice President of Membership</p>
                <a href="mailto:akpsiotrush@gmail.com">akpsiotrush@gmail.com</a>
              </div>
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