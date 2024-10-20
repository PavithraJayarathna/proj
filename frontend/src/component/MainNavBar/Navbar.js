import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import log from '../../image/log.png';

export default function Navbar({ handleLoginClick }) {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-log">
            <NavLink to="/" end>
              <img src={log} alt="log" className="log-image" />
              <span className="log-name">Leave Safe</span>
            </NavLink>
          </div>
          <div className="navbar-links-container">
            <ul className="navbar-links">
              <li>
                <NavLink 
                  to="/" 
                  end 
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact" 
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
