import React, { useEffect, useState } from 'react';
import StaffBar from '../../../component/StaffNavBar/StaffBar';
import './SDashboard.css';
import axios from 'axios';
import All from '../../../image/alll_leave.png';
import Approved from '../../../image/approved.png';
import Pending from '../../../image/pending.png';
import Rejected from '../../../image/reject.png';
const apiUrl = env.process.HOST_ADDRESS

export default function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);
  const [empCount, setEmpCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  
  const emails = localStorage.getItem('staffEmail'); 

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const result = await axios.get(`${apiUrl}/api/leaves/${encodeURIComponent(emails)}`);
        setLeaves(result.data);


        const allLeaves = result.data.length;
        const approvedLeaves = result.data.filter(leave => leave.status === 'Approved').length;
        const pendingLeaves = result.data.filter(leave => leave.status === 'Pending').length;
        const rejectedLeaves = result.data.filter(leave => leave.status === 'Rejected').length;

        setEmpCount(allLeaves);
        setApprovedCount(approvedLeaves);
        setPendingCount(pendingLeaves);
        setRejectedCount(rejectedLeaves);
      } catch (error) {
        console.error("There was an error fetching the leaves!", error);
      }
    };

    if (emails) {
      fetchData();
    }
  }, [emails]);

  return (
    <div className="leave-history-container">
      <StaffBar />
      <div className="main-container">
        <div className="title pb-20">
          <h2 className="h3 mb-0">LEAVE BREAKDOWN</h2>
        </div>
        <div className="row pb-10">
          <div className="col-xl-3 col-lg-3 col-md-6 mb-20">
            <div className="card-box height-100-p widget-style3">
              <div className="widget-data">
                <div className="weight-700 font-24 text-dark">{empCount}</div>
                <div className="font-14 text-secondary weight-500">All Applied Leave</div>
              </div>
              <div className="fwidget-icon">
                <img src={All} alt="All Leaves" className="icon-img"/>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 mb-20">
            <div className="card-box height-100-p widget-style3">
              <div className="widget-data">
                <div className="weight-700 font-24 text-dark">{approvedCount}</div>
                <div className="font-14 text-secondary weight-500">Approved</div>
              </div>
              <div className="widget-icon">
                <img src={Approved} alt="Approved" className="icon-img"/>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 mb-20">
            <div className="card-box height-100-p widget-style3">
              <div className="widget-data">
                <div className="weight-700 font-24 text-dark">{pendingCount}</div>
                <div className="font-14 text-secondary weight-500">Pending</div>
              </div>
              <div className="widget-icon">
                <img src={Pending} alt="Pending" className="icon-img"/>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 mb-20">
            <div className="card-box height-100-p widget-style3">
              <div className="widget-data">
                <div className="weight-700 font-24 text-dark">{rejectedCount}</div>
                <div className="font-14 text-secondary weight-500">Rejected</div>
              </div>
              <div className="widget-icon">
                <img src={Rejected} alt="Rejected" className="icon-img"/>
              </div>
            </div>
          </div>
        </div>

        <div className="pd-20">
          <h2 className="text-blue h4">ALL MY LEAVE</h2>
        </div>
        
        <div className="lcard-box mb-30">
          <div className="pb-20">
            <table className="data-table table stripe hover nowrap">
              <thead>
                <tr>
                  <th className="table-plus">LEAVE TYPE</th>
                  <th>DATE FROM</th>
                  <th>DATE TO</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave, index) => (
                  <tr key={index}>
                    <td>{leave.leaveType}</td>
                    <td>{leave.startDate.split('T')[0]}</td>
                    <td>{leave.endDate.split('T')[0]}</td>
                    <td>
                      <span style={{ color: leave.status === 'Approved' ? 'green' : leave.status === 'Rejected' ? 'red' : 'blue' }}>
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
