import React from 'react';
import { Link } from 'react-router-dom'; // import Link from react-router-dom
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
        <h1 className="organization-name">
          ALPHA KAPPA PSI<br />OMEGA THETA
        </h1>
      </div>
      
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/recruitment">Recruitment</Link>
          </li>
          <li>
            <Link to="/exec">Exec</Link>
          </li>
          <li>
            <Link to="/brothers">Brothers</Link>
          </li>
          <li>
            <Link to="/alumni">Alumni</Link>
          </li>
        </ul>
      </nav>
      
      <button className="contact-button">CONTACT US</button>
    </header>
  );
};

export default Header;