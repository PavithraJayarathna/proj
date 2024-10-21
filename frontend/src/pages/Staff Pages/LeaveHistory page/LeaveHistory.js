import React, { useEffect, useState } from 'react';
import StaffBar from '../../../component/StaffNavBar/StaffBar';
import './LeaveHistory.css';
import axios from 'axios';
import All from '../../../image/alll.png';
import Approved from '../../../image/approved.png';
import Pending from '../../../image/pending.png';
import Rejected from '../../../image/reject.png';

const apiUrl = process.env.HOST_ADDRESS

export default function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);
  const [empCount, setEmpCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/leaves');
        setLeaves(result.data);

        const allLeaves = result.data.length;
        const approvedLeaves = result.data.filter(leave => leave.Status === 1).length;
        const pendingLeaves = result.data.filter(leave => leave.Status === 0).length;
        const rejectedLeaves = result.data.filter(leave => leave.Status === 2).length;

        setEmpCount(allLeaves);
        setApprovedCount(approvedLeaves);
        setPendingCount(pendingLeaves);
        setRejectedCount(rejectedLeaves);
      } catch (error) {
        console.error("There was an error fetching the leaves!", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="leave-history-container">
      <StaffBar />
      <div className="main-container">
        <div className="title pb-20">
          <h2 className="h3 mb-0">Leave Breakdown</h2>
        </div>
        <div className="row pb-10">
          <div className="col-xl-3 col-lg-3 col-md-6 mb-20">
            <div className="card-box height-100-p widget-style3">
              <div className="widget-data">
                <div className="weight-700 font-24 text-dark">{empCount}</div>
                <div className="font-14 text-secondary weight-500">All Apply Leave</div>
              </div>
              <div className="widget-icon">
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
                  <th>NO. OF DAYS</th>
                  <th>HOD STATUS</th>
                  <th>REG. STATUS</th>
                  <th className="datatable-nosort">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave, index) => (
                  <tr key={index}>
                    <td>{leave.LeaveType}</td>
                    <td>{leave.FromDate}</td>
                    <td>{leave.ToDate}</td>
                    <td>{leave.num_days}</td>
                    <td>
                      {leave.Status === 1 && <span style={{ color: 'green' }}>Approved</span>}
                      {leave.Status === 2 && <span style={{ color: 'red' }}>Not Approved</span>}
                      {leave.Status === 0 && <span style={{ color: 'blue' }}>Pending</span>}
                    </td>
                    <td>
                      {leave.admin_status === 1 && <span style={{ color: 'green' }}>Approved</span>}
                      {leave.admin_status === 2 && <span style={{ color: 'red' }}>Not Approved</span>}
                      {leave.admin_status === 0 && <span style={{ color: 'blue' }}>Pending</span>}
                    </td>
                    <td>
                      <div className="table-actions">
                        <a title="VIEW" href={`view_leave.php?edit=${leave.id}`} data-color="#265ed7"><i className="icon-copy dw dw-eye"></i></a>
                      </div>
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
