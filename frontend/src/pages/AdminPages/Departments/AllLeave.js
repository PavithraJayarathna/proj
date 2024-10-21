import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../component/AdminNavBar/AdminBar';
import './AllLeave.css';

const apiUrl = process.env.REACT_APP_HOST_ADDRESS

const AllLeave = () => {
  const [allLeaves, setAllLeaves] = useState([]);

  const fetchAllLeaves = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/allLeaves`);
      const data = await response.json();
      console.log('Fetched leave data:', data);

      const sortedLeaves = data.sort((a, b) => {
        if (a.status === 'Pending' && b.status !== 'Pending') return -1; 
        if (b.status === 'Pending' && a.status !== 'Pending') return 1;  
        return 0; 
      });

      setAllLeaves(sortedLeaves);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const handleStatusChange = async (leaveId, status) => {
    try {
      const response = await fetch(`${apiUrl}/api/updateLeaveStatus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leaveId, status }),
      });

      if (response.ok) {
        const updatedLeave = await response.json();
        setAllLeaves((prevLeaves) =>
          prevLeaves.map((leave) =>
            leave._id === updatedLeave._id ? updatedLeave : leave
          )
        );
      } else {
        console.error('Failed to update leave status');
      }
    } catch (error) {
      console.error('Error updating leave status:', error);
    }
  };


  const addNewLeave = async (newLeave) => {
    try {
      const response = await fetch(`${apiUrl}/api/addLeave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLeave),
      });

      if (response.ok) {
        const addedLeave = await response.json();
        
       
      } else {
        console.error('Failed to add new leave');
      }
    } catch (error) {
      console.error('Error adding new leave:', error);
    }
  };

  useEffect(() => {
    fetchAllLeaves();
  }, []);

  return (
    <div>
      <AdminSidebar />
      <div className="ALmain-container">
        <div className="ALpd-ltr-20">
          <div className="ALpage-header">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="ALtitle">
                  <h4>Leave Safe</h4>
                </div>
                <nav aria-label="breadcrumb" role="navigation">
                  <ol className="ALbreadcrumb">
                    <li className="ALbreadcrumb-item">
                      <a href="/dashboard">Dashboard</a>
                    </li>
                    <li className="ALbreadcrumb-item ALactive" aria-current="page">
                      All Leave
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>

          <div className="ALcard-box mb-30">
            <div className="ALpd-20">
              <h2 className="ALtext-blue h4">ALL LEAVE</h2>
            </div>
            <div className="ALpb-20">
              <table className="data-table ALtable stripe hover nowrap">
                <thead>
                  <tr>
                    <th className="ALtable-plus ALdatatable-nosort">STAFF NAME</th>
                    <th>LEAVE TYPE</th>
                    <th>DATE FROM</th>
                    <th>DATE TO</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {allLeaves.length > 0 ? (
                    allLeaves.map((leave) => (
                      <tr key={leave._id}>
                        <td>{leave.firstName} {leave.lastName}</td>
                        <td>{leave.leaveType}</td>
                        <td>{leave.startDate.split('T')[0]}</td>
                        <td>{leave.endDate.split('T')[0]}</td>
                        <td>
                          <select
                            defaultValue={leave.status}
                            onChange={(e) => handleStatusChange(leave._id, e.target.value)}
                            style={{
                              color: leave.status === 'Pending' ? 'orange' : 'black',
                            }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No leave applications found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllLeave;




