import React, { useState } from 'react';
import Navbar from '../component/MainNavBar/Navbar';
import './Home.css';
import emp from '../image/emp.png';
import LoginForm from './LoginPage';
import { FaWindowClose } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginType, setLoginType] = useState(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false); 
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setLoginType(null);
    setIsForgotPassword(false); 
  };

  const handleAdminLogin = () => {
    setLoginType('admin');
  };

  const handleStaffLogin = () => {
    setLoginType('staff');
  };

  return (
    <div>
      <Navbar handleLoginClick={handleLoginClick} />
      <div className="home-container">
        <div className="content-container">
          <h1 className="h1title">Leave Management System</h1>
          <p className="description">
            Streamline employee leave requests with our user-friendly platform.
            Employees can easily <br /> submit requests and track their leave balances,
            while administrators can manage and approve <br /> requests effortlessly.
            Enhance workplace efficiency and employee satisfaction with our <br /> intuitive leave management solution.
          </p>
          <button className="Mlogin-button" onClick={handleLoginClick}>L O G I N</button>
          <img src={emp} alt="Leave Management" className="emp" />
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content-log">
            <FaWindowClose 
              className="modal-close-icon" 
              onClick={handleCloseModal} 
              style={{ cursor: 'pointer', position: 'absolute', top: '10px', right: '10px', fontSize: '1.5rem' }} 
            />
            {isForgotPassword ? (
              <h2>Forgot Password Page</h2> 
            ) : loginType === null ? (
              <>
                <h2>Select Login Type</h2>
                <button className="modal-button" onClick={handleAdminLogin}>Admin Login</button>
                <button className="modal-button" onClick={handleStaffLogin}>Staff Login</button>
              </>
            ) : (
              <LoginForm 
                loginType={loginType} 
                onClose={handleCloseModal} 
                onForgotPassword={() => setIsForgotPassword(true)} 
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

