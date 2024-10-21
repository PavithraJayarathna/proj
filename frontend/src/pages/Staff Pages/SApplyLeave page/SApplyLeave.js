import React, { useState } from 'react';
import StaffBar from '../../../component/StaffNavBar/StaffBar';
import './SApplyLeave.css';
const apiUrl = env.process.HOST_ADDRESS

export default function SApplyLeave() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/applyLeave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Leave application successfully submitted');
        setMessageType('success'); 
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          leaveType: '',
          startDate: '',
          endDate: '',
          reason: ''
        });
      } else {
        setMessage(data.message || 'Error applying for leave');
        setMessageType('error'); 
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error applying for leave');
      setMessageType('error'); 
    }
  };

  return (
    <div>
      <StaffBar />
      <div className="apply-leave-container">
        <div className="apply-leave-form">
          <h1>Apply Leave</h1>
          {message && (
            <p className={`message message-${messageType}`}>{message}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="Sform-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Sform-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Sform-group">
              <label>Email Address:</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Sform-group">
              <label>Leave Type:</label>
              <select
                name="leaveType"
                value={form.leaveType}
                onChange={handleChange}
                required
              >
                <option value="">Select leave type...</option>
                <option value="sick">Sick Leave</option>
                <option value="vacation">Vacation Leave</option>
                <option value="maternity">Maternity Leave</option>
              </select>
            </div>
            <div className="Sform-group">
              <label>Start Leave Date:</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Sform-group">
              <label>End Leave Date:</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Sform-group">
              <label>Reason for Leave:</label>
              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
                required
              />
            </div>
            <button className="apply-button" type="submit">S U B M I T</button>
          </form>
        </div>
      </div>
    </div>
  );
}
