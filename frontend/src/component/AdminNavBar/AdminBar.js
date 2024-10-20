import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUsers, faCalendarAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { RiDashboardHorizontalLine, RiLogoutBoxLine } from 'react-icons/ri';
import './AdminBar.css';
import log from '../../image/log.png'; 

export default function AdminSidebar() {
  const [isLeaveMenuOpen, setIsLeaveMenuOpen] = useState(false);
  const [isStaffMenuOpen, setIsStaffMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  const toggleLeaveMenu = () => {
    setIsLeaveMenuOpen(!isLeaveMenuOpen);
  };

  const toggleStaffMenu = () => {
    setIsStaffMenuOpen(!isStaffMenuOpen);
  };

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
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
            <RiDashboardHorizontalLine className="menu-icon" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/allleave" className={location.pathname === '/allleave' ? 'active' : ''}>
            <FontAwesomeIcon icon={faBuilding} className="menu-icon" />
            All Leave
          </Link>
        </li>
        <li>
          <button className="staff-menu-button" onClick={toggleStaffMenu}>
            <FontAwesomeIcon icon={faUsers} className="menu-icon" />
            Staff
            <FontAwesomeIcon icon={faChevronRight} className={`chevron-icon ${isStaffMenuOpen ? 'rotate' : ''}`} />
          </button>
          {isStaffMenuOpen && (
            <ul className="submenu">
              <li>
                <Link to="/staff/add" className={location.pathname === '/staff/add' ? 'active' : ''}>Add Staff</Link>
              </li>
              <li>
                <Link to="/staff/details" className={location.pathname === '/staff/details' ? 'active' : ''}>Staff Details</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <button className="leave-menu-button" onClick={toggleLeaveMenu}>
            <FontAwesomeIcon icon={faCalendarAlt} className="menu-icon" />
            Leave
            <FontAwesomeIcon icon={faChevronRight} className={`chevron-icon ${isLeaveMenuOpen ? 'rotate' : ''}`} />
          </button>
          {isLeaveMenuOpen && (
            <ul className="submenu">
              <li>
                <Link to="/leave/approved" className={location.pathname === '/leave/approved' ? 'active' : ''}>Approved Leave</Link>
              </li>
              <li>
                <Link to="/leave/pending" className={location.pathname === '/leave/pending' ? 'active' : ''}>Pending Leave</Link>
              </li>
              <li>
                <Link to="/leave/rejected" className={location.pathname === '/leave/rejected' ? 'active' : ''}>Rejected Leave</Link>
              </li>
            </ul>
          )}
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
