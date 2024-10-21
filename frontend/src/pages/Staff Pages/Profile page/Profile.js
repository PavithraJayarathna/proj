import React, { useEffect, useState } from 'react';
import StaffBar from '../../../component/StaffNavBar/StaffBar';
import './Profile.css';
const apiUrl = env.process.HOST_ADDRESS

const Profile = () => {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const email = localStorage.getItem('staffEmail');

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/staff/${encodeURIComponent(email)}`);

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Error fetching staff data: ${response.status} - ${errorMessage}`);
        }

        const data = await response.json();
        setStaff(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffDetails();
  }, [email]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/staff/${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Afirstname: staff.Afirstname || '',
          Alastname: staff.Alastname || '',
          Aphonenumber: staff.Aphonenumber || '',
          Agender: staff.Agender || '',
          Adob: staff.Adob || '',
          Aaddress: staff.Aaddress || '',
          Adepartment: staff.Adepartment || '',
          Auser_role: staff.Auser_role || '',
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error updating staff data: ${response.status} - ${errorMessage}`);
      }

      const updatedStaff = await response.json();
      setStaff(updatedStaff);
      setIsEditing(false);

     
      window.confirm('Your profile has been successfully updated!');
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (loading || !staff) {
    return <div className="loading-message">Loading staff details...</div>;
  }

  return (
    <div>
      <StaffBar />
      <div className="profile-container">
        <div className="profile-header">
          {}
          <h1>Hi, {staff.Afirstname || 'User'}</h1>
        </div>
        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-label">First Name:</span>
            <input
              className="detail-input"
              type="text"
              name="Afirstname"
              value={staff.Afirstname || ''}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="detail-item">
            <span className="detail-label">Last Name:</span>
            <input
              className="detail-input"
              type="text"
              name="Alastname"
              value={staff.Alastname || ''}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="detail-item">
            <span className="detail-label">Email:</span>
            <input className="detail-input" type="text" value={staff.Aemail || ''} readOnly />
          </div>
          <div className="detail-item">
            <span className="detail-label">Phone Number:</span>
            <input
              className="detail-input"
              type="text"
              name="Aphonenumber"
              value={staff.Aphonenumber || ''}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="detail-item">
            <span className="detail-label">Gender:</span>
            <input
              className="detail-input"
              type="text"
              name="Agender"
              value={staff.Agender || ''}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="detail-item">
            <span className="detail-label">Date of Birth:</span>
            <input
              className="detail-input"
              type="date"
              name="Adob"
              value={staff.Adob ? staff.Adob.split('T')[0] : ''}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="detail-item">
            <span className="detail-label">Address:</span>
            <input
              className="detail-input"
              type="text"
              name="Aaddress"
              value={staff.Aaddress || ''}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="detail-item">
            <span className="detail-label">Department:</span>
            <input
              className="detail-input"
              type="text"
              name="Adepartment"
              value={staff.Adepartment || ''}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="detail-item">
            <span className="detail-label">User Role:</span>
            <input
              className="detail-input"
              type="text"
              name="Auser_role"
              value={staff.Auser_role || ''}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="edit-button-container">
            {isEditing ? (
              <button type="button" className="pbutton" onClick={handleSaveClick}>
                Save
              </button>
            ) : (
              <button type="button" className="pbutton" onClick={handleEditClick}>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


