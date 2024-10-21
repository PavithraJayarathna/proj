
import React, { useState } from 'react'; 
import './LoginPage.css';
import emailIcon from '../image/email.png';
import passwordIcon from '../image/show.jpeg';
import hideIcon from '../image/hide.jpeg';
import closeIcon from '../image/close.png';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_HOST_ADDRESS;

export default function LoginForm({ loginType, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      console.log(apiUrl);
     
      const url = loginType === 'admin'
        ? `${apiUrl}/admin/login`
        : `${apiUrl}/api/stafflogin`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        
        if (loginType === 'staff') {
          localStorage.setItem('staffEmail', email); 
        }

       
        if (loginType === 'admin') {
          navigate('/dashboard'); 
        } else if (loginType === 'staff') {
          navigate('/sdashboard'); 
        }
        onClose();
      } else {
        setErrorMessage(data.message); 
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Login failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        <h2>{loginType === 'admin' ? 'Admin' : 'Staff'} Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              
            />
            <button className="toggle-password">
              <img src={emailIcon} alt="Email Icon" />
            </button>
            
          </div>

          <div className="form-group password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              <img
                src={showPassword ? hideIcon : passwordIcon}
                alt={showPassword ? 'Hide Password' : 'Show Password'}
              />
            </button>
          </div>
          <div className="cform-group remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

         
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}
