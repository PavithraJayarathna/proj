import React, { useState } from 'react';
import Navbar from '../component/MainNavBar/Navbar';
import './ContactUs.css';
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { IoIosCloseCircleOutline } from "react-icons/io";  
import { PiHandshakeFill } from "react-icons/pi"; 
import { MdOutlinePhoneInTalk } from "react-icons/md"; 

export default function ContactUs() {
  const [email, setEmail] = useState('');        
  const [message, setMessage] = useState(''); 
  const [name, setName] = useState('')   
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState(null);      

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      const backendResponse = await fetch('http://localhost:5080/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name,email, message }),
      });

      if (!backendResponse.ok) {
        throw new Error('Failed to store data in the backend.');
      }

     
      const formspreeResponse = await fetch('https://formspree.io/f/mdkooawz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      if (formspreeResponse.ok) {
        setIsModalVisible(true);  
        setError(null);         
      } else {
        setError('Email could not be sent via Formspree. Please try again.');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form. Please try again.');
    }
  };

 
  const handleClose = () => {
    setIsModalVisible(false);  
    setEmail('');              
    setMessage('');           
    window.location.href = '/';  
  };

  return (
    <div>
      <Navbar />
      <div className="contact-us">
        <h1>Contact Us</h1>
        <p>Any questions or remarks? Just write us a message!</p>

        <form className="contact-form" onSubmit={handleSubmit}>
        <input 
            type="text" 
            placeholder="Enter your Name " 
            value={name}
            onChange={(e) => setName(e.target.value)}  
            required 
          />
          <input 
            type="email" 
            placeholder="Enter a valid email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="text" 
            placeholder="Write your message here" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}  
            required 
          />
          <button type="submit">Submit</button>
        </form>

        {error && <p className="error-message">{error}</p>}  {}

        <div className="contact-details">
          <div className="contact-item">
          <MdOutlineMarkEmailRead size ={42} color = {'#d7ba89'} />
            <h2>About Club</h2>
            <p>Running Guide</p>
            <p>Leaves Management</p>
          </div>
          <div className="contact-item">
          <MdOutlinePhoneInTalk  size ={42} color={'#eaf0ce'}/>
            <h2>Phone (Landline)</h2>
            <p>+912 3 567 8987</p>
            <p>+912 5 252 3336</p>
          </div>
          <div className="contact-item">
          <SlLocationPin size={42} color={'#c6d8ff'} />
            <h2>Our Office Location</h2>
            <p>The Interior Design Studio </p>
            <p>The Courtyard, Al Quoz 1, </p>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={handleClose}>
              <IoIosCloseCircleOutline size={32} color={'red'} />  {}
            </button>
            <h2>Thank You!</h2>
            <PiHandshakeFill size={44} className="animated-icon" /> {}
            <p>Your submission has been received.</p>
            <button className="back-button" onClick={handleClose}>Back to Main Menu</button>
          </div>
        </div>
      )}
    </div>
  );
}


