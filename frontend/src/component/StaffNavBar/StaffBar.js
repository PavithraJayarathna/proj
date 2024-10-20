import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarPlus, faHistory } from '@fortawesome/free-solid-svg-icons';
import { RiDashboardHorizontalLine } from 'react-icons/ri';
import { RiLogoutBoxLine } from "react-icons/ri";
import './Staff.css';

import log from '../../image/log.png'; 

export default function StaffBar() {
  const navigate = useNavigate();

  const handleLogout = () => {

    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="logo-section">
        <img src={log} alt="Logo" className="logo-image" />
        <span className="logo-name">Leave Safe</span>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/sdashboard">
            <RiDashboardHorizontalLine className="menu-icon" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} className="menu-icon" />
            Profile
          </Link>
        </li>
        <li>
          <Link to="/sapplyleave">
            <FontAwesomeIcon icon={faCalendarPlus} className="menu-icon" />
            Apply Leave
          </Link>
        </li>
       
      </ul>
      <div className="sidebar-footer">
        <button className="logout-button" onClick={handleLogout}>
          <RiLogoutBoxLine className="menu-icon" />
          Logout
        </button>
      </div>
    </div>
  );
}
