import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../../component/AdminNavBar/AdminBar';
import './ApprovedLeave.css';

const apiUrl = process.env.HOST_ADDRESS

const ApprovedLeave = () => {
  const [approvedLeaves, setApprovedLeaves] = useState([]);

  const fetchApprovedLeaves = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/approvedLeaves`); 
      const data = await response.json();
      setApprovedLeaves(data);
    } catch (error) {
      console.error('Error fetching approved leaves:', error);
    }
  };

  useEffect(() => {
    fetchApprovedLeaves();
  }, []);

  return (
    <div>
      <AdminSidebar />
      <div className="APmain-container">
        <div className="APpd-ltr-20">
          <div className="APpage-header">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="APtitle">
                  <h4>Leave Safe</h4>
                </div>
                <nav aria-label="breadcrumb" role="navigation">
                  <ol className="APbreadcrumb">
                    <li className="APbreadcrumb-item">
                      <a href="/dashboard">Dashboard</a>
                    </li>
                    <li className="APbreadcrumb-item APactive" aria-current="page">
                      Approved Leave
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>

          <div className="APcard-box mb-30">
            <div className="APpd-20">
              <h2 className="APtext-blue h4">APPROVED LEAVE</h2>
            </div>
            <div className="APpb-20">
              <table className="data-table APtable stripe hover nowrap">
                <thead>
                  <tr>
                    <th>STAFF NAME</th>
                    <th>LEAVE TYPE</th>
                    <th>START DATE</th>
                    <th>END DATE</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedLeaves.map((leave) => (
                    <tr key={leave._id}>
                      <td>{leave.firstName} {leave.lastName}</td>
                      <td>{leave.leaveType}</td>
                      <td>{leave.startDate.split('T')[0]}</td>
                      <td>{leave.endDate.split('T')[0]}</td>
                      <td style={{ color: 'green' }}>{leave.status}</td>
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

export default ApprovedLeave;

