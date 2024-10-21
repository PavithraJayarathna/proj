import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Calendar from 'react-calendar';
import Chart from 'chart.js/auto';
import 'react-calendar/dist/Calendar.css';
import './Dashboard.css';
import AdminSidebar from '../../../component/AdminNavBar/AdminBar';
import All from '../../../image/staff1.png';
import Approved from '../../../image/approved.png';
import Pending from '../../../image/pending.png';
import Rejected from '../../../image/reject.png';

const apiUrl = process.env.REACT_APP_HOST_ADDRESS

const Dashboard = () => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [empCount, setEmpCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November','December'],
    datasets: [
      {
        label: 'Approved Leaves Summary',
        data: [],
        fill: false,
        backgroundColor: 'rgba(233, 114, 209, 0.4)',
        borderColor: 'rgba(233, 114, 209)',
      },
    ],
  });

  const chartOptions = {
    maintainAspectRatio: false,
  };

  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/dashboard-stats`);
        const data = await response.json();

        

        
        setEmpCount(data.totalStaff);
        setApprovedCount(data.approvedLeaves);
        setPendingCount(data.pendingLeaves);
        setRejectedCount(data.rejectedLeaves);

       
        setChartData(prevData => ({
          ...prevData,
          datasets: [{
            ...prevData.datasets[0],
            data: [data.approvedLeaves, data.pendingLeaves, data.rejectedLeaves], 
          }]
        }));
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchDashboardData();
  }, []); 

  return (
    <div className="Ddashboard-container">
      <AdminSidebar /> 
      <div className="Ddashboard-content">
        <div className="Ddashboard-header">
          <h1>Welcome, to Leave Safe</h1>
          <p>This is your dashboard</p>
        </div>

        <div className="Dwidgets">
          <div className="Dcard-box Dcard-box-all">
            <div className="Dwidget-data">
              <div className="Dweight-700 Dfont-24 Dtext-dark">{empCount}</div>
              <div className="Dfont-14 Dtext-secondary Dweight-500">All Staff members</div>
            </div>
            <div className="Dwidget-icon">
              <img src={All} alt="All Leaves" className="Dicon-img"/>
            </div>
          </div>
          <div className="Dcard-box Dcard-box-approved">
            <div className="Dwidget-data">
              <div className="Dweight-700 Dfont-24 Dtext-dark">{approvedCount}</div>
              <div className="Dfont-14 Dtext-secondary Dweight-500">Approved Leave</div>
            </div>
            <div className="Dwidget-icon">
              <img src={Approved} alt="Approved" className="Dicon-img"/>
            </div>
          </div>
          <div className="Dcard-box Dcard-box-pending">
            <div className="Dwidget-data">
              <div className="Dweight-700 Dfont-24 Dtext-dark">{pendingCount}</div>
              <div className="Dfont-14 Dtext-secondary Dweight-500">Pending Leave</div>
            </div>
            <div className="Dwidget-icon">
              <img src={Pending} alt="Pending" className="Dicon-img"/>
            </div>
          </div>
          <div className="Dcard-box Dcard-box-rejected">
            <div className="Dwidget-data">
              <div className="Dweight-700 Dfont-24 Dtext-dark">{rejectedCount}</div>
              <div className="Dfont-14 Dtext-secondary Dweight-500">Rejected Leave</div>
            </div>
            <div className="Dwidget-icon">
              <img src={Rejected} alt="Rejected" className="Dicon-img"/>
            </div>
          </div>
        </div>

        <div className="Dsummary">
          <div className="Dchart-container">
            <h3>Leaves Summary</h3>
            <Line data={chartData} options={chartOptions} />
          </div>
          <div className="Dcalendar-container">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


