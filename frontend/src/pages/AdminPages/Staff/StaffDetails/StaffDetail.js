import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../../component/AdminNavBar/AdminBar';
import './StaffDetail.css';
import { AiOutlineDelete } from 'react-icons/ai'; 

const StaffDetail = () => {
  const [staffList, setStaffList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 

 
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch('http://localhost:5080/api/employeedetails');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStaffList(data); 
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaff();
  }, []);

 
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        const response = await fetch(`http://localhost:5080/api/deleteemployee/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          alert('Staff member successfully deleted');
          setStaffList(staffList.filter((staff) => staff._id !== id)); 
        } else {
          alert('Failed to delete staff member');
        }
      } catch (error) {
        console.error('Error deleting staff member:', error);
        alert('Error deleting staff member. Please try again.');
      }
    }
  };

 
  const filteredStaffList = staffList.filter((staff) =>
    `${staff.Afirstname} ${staff.Alastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <AdminSidebar />
      <div className="Amain-container">
        <div className="Apd-ltr-20">
          <div className="Apage-header">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="Atitle">
                  <h4>Leave Safe</h4>
                </div>
                <nav aria-label="breadcrumb" role="navigation">
                  <ol className="Abreadcrumb">
                    <li className="Abreadcrumb-item">
                      <a href="/dashboard">Dashboard</a>
                    </li>
                    <li className="Abreadcrumb-item REactive" aria-current="page">
                      Staff Details
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>

          <div className="Acard-box form-container">
            <div className="Apd-20">
              <h2 className="Atext-black h4">Employees ({filteredStaffList.length})</h2>
              <div className="Asearch-filter">
                <input
                  type="text"
                  placeholder="Search by name"
                  className="Asearch-input"
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
                
              </div>
            </div>
            <div className="Apb-20">
              <table className="Aemployee-table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Date of Birth</th>
                    <th>Department</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaffList.map((staff) => (
                    <tr key={staff._id}>
                      <td>{staff.Afirstname}</td>
                      <td>{staff.Alastname}</td>
                      <td>{staff.Aemail}</td>
                      <td>{staff.Aphonenumber}</td>
                      <td>{staff.Adob.split('T')[0]}</td>
                      <td>{staff.Adepartment}</td>
                      <td>
                        <button onClick={() => handleDelete(staff._id)} className="delete-icon">
                          <AiOutlineDelete size={24} color='red'/> 
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetail;




