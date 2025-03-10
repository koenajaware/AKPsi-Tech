import React from 'react';
import '../../styles/Home/Header.css';
import logo from "../../assets/Akpsi-emblem.png";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img 
          src={logo} 
          alt="Alpha Kappa Psi logo" 
          className="logo" 
        />
        <h1 className="organization-name">ALPHA KAPPA PSI<br />OMEGA THETA</h1>
      </div>
      
      <nav className="navigation">
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#recruitment">Recruitment</a></li>
          <li><a href="#exec">Exec</a></li>
          <li><a href="#brothers">Brothers</a></li>
          <li><a href="#alumni">Alumni</a></li>
        </ul>
      </nav>
      
      <button className="contact-button">CONTACT US</button>
    </header>
  );
};

export default Header;