import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../../component/AdminNavBar/AdminBar';
import './PendingLeave.css'; 

const PendingLeave = () => {
  const [pendingLeaves, setPendingLeaves] = useState([]);

  const fetchPendingLeaves = async () => {
    try{
    const response = await fetch('http://localhost:5080/api/pendingLeaves'); 
    const data = await response.json();
    setPendingLeaves(data);
  }catch(error){
    console.error('Error fetchiing pending leaves')
  }
  };

  useEffect(() => {
    fetchPendingLeaves();
  }, []);

  return (
    <div>
      <AdminSidebar />
      <div className="PEmain-container">
        <div className="PEpd-ltr-20">
          <div className="PEpage-header">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="PEtitle">
                  <h4>Leave Safe</h4>
                </div>
                <nav aria-label="breadcrumb" role="navigation">
                  <ol className="PEbreadcrumb">
                    <li className="PEbreadcrumb-item">
                      <a href="/dashboard">Dashboard</a>
                    </li>
                    <li className="PEbreadcrumb-item PEactive" aria-current="page">
                      Pending Leave
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>

          <div className="PEcard-box mb-30">
            <div className="PEpd-20">
              <h2 className="PEtext-blue h4">PENDING LEAVE</h2>
            </div>
            <div className="PEpb-20">
              <table className="data-table PEtable stripe hover nowrap">
                <thead>
                  <tr>
                    <th className="PEtable-plus PEdatatable-nosort">STAFF NAME</th>
                    <th>LEAVE TYPE</th>
                    <th>START DATE</th>
                    <th>END DATE</th>
                    <th>STATUS</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {pendingLeaves.map((leave) => (
                    <tr key ={leave._id}>
                      <td>{leave.firstName} {leave.lastName}</td>
                      <td>{leave.leaveType}</td>
                      <td>{leave.startDate.split('T')[0]}</td>
                      <td>{leave.endDate.split('T')[0]}</td>
                      <td style={{ color: 'orange' }}>{leave.status}</td>

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

export default PendingLeave;
