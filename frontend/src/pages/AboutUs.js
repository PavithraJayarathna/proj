import React from 'react'
import './AboutUs.css';
import about from '../image/about.png'
import Navbar from '../component/MainNavBar/Navbar'

export default function AboutUs() {
  return (
    <div>
      <Navbar/>
      <div className="about-us">
      
      <div className="content">
        <div className="text">
          <h1>Discover Our Mission: Making Leave Management Easy and Effective for You</h1>
          <p>
          Welcome to the Leave Management System, a simple and efficient solution for managing staff leave requests. Our platform streamlines the process of applying, approving, and tracking leaves, ensuring transparency and accuracy for both employees and administrators. Designed to enhance productivity and reduce manual work, our system helps organizations handle leave management with ease and reliability. Whether you're managing a small team or a large workforce, our solution is here to simplify your leave management process.
          </p>
          
        </div>
        <div className="image-container">
          <img src={about} alt="About Us" className="about" />
        </div>
      </div>
    </div>
    </div>
  )
}
