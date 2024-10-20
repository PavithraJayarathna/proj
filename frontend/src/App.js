import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; 
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Dashboard from './pages/AdminPages/Dashboards/Dashboard';
import LeaveDetails from './pages/AdminPages/Departments/AllLeave';
import AddStaff from './pages/AdminPages/Staff/AddStaffs/AddStaff';
import StaffDetail from './pages/AdminPages/Staff/StaffDetails/StaffDetail';
import ApprovedLeave from './pages/AdminPages/Leave/ApprovedLeave/ApprovedLeave';
import PendingLeave from './pages/AdminPages/Leave/PendingLeave/PendingLeave';
import RejectedLeave from './pages/AdminPages/Leave/RejectedLeave/RejectedLeave';
import SDashboard from './pages/Staff Pages/SDashboard page/SDashboard';
import Profile from './pages/Staff Pages/Profile page/Profile';
import SApplyLeave from './pages/Staff Pages/SApplyLeave page/SApplyLeave';
import LeaveHistory from './pages/Staff Pages/LeaveHistory page/LeaveHistory';
import LoginForm from './pages/LoginPage'; 
import ForgotPassword from './pages/ForgotPassword'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<LoginForm loginType="admin" onClose={() => {}} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/allleave" element={<LeaveDetails />} />
          <Route path="/staff/add" element={<AddStaff />} />
          <Route path="/staff/details" element={<StaffDetail />} />
          <Route path="/leave/approved" element={<ApprovedLeave />} />
          <Route path="/leave/pending" element={<PendingLeave />} />
          <Route path="/leave/rejected" element={<RejectedLeave />} />
          <Route path="/sdashboard" element={<SDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sapplyleave" element={<SApplyLeave />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;





