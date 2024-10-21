import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../../component/AdminNavBar/AdminBar';
import './RejectedLeave.css'; 
const apiUrl = env.process.HOST_ADDRESS

const RejectedLeave = () => {
  const [rejectedLeaves, setRejectedLeaves] = useState([]);

  const fetchRejectedLeaves = async () => {
    try{
    const response = await fetch(`${apiUrl}/api/rejectedLeaves`); 
    const data = await response.json();
    setRejectedLeaves(data);
  } catch(error) {
      console.error('Error fetching rejected leaves', error);
  }
  };

  useEffect(() => {
    fetchRejectedLeaves();
  }, []);

  return (
    <div>
      <AdminSidebar />
      <div className="REmain-container">
        <div className="REpd-ltr-20">
          <div className="REpage-header">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="REtitle">
                  <h4>Leave Safe</h4>
                </div>
                <nav aria-label="breadcrumb" role="navigation">
                  <ol className="REbreadcrumb">
                    <li className="REbreadcrumb-item">
                      <a href="/dashboard">Dashboard</a>
                    </li>
                    <li className="REbreadcrumb-item REactive" aria-current="page">
                      Rejected Leave
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>

          <div className="REcard-box mb-30">
            <div className="REpd-20">
              <h2 className="REtext-blue h4">REJECTED LEAVE</h2>
            </div>
            <div className="REpb-20">
              <table className="data-table REtable stripe hover nowrap">
                <thead>
                  <tr>
                    <th className="REtable-plus REdatatable-nosort">STAFF NAME</th>
                    <th>LEAVE TYPE</th>
                    <th>START DATE</th>
                    <th>END DATE</th>
                    <th>STATUS</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {rejectedLeaves.map((leave) => (
                    <tr key ={leave._id}>
                      <td>{leave.firstName} {leave.lastName}</td>
                      <td>{leave.leaveType}</td>
                      <td>{leave.startDate.split('T')[0]}</td>
                      <td>{leave.endDate.split('T')[0]}</td>
                      <td style={{ color: 'red' }}>{leave.status}</td>

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

export default RejectedLeave;
