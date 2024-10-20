const express = require("express");
const connectDB = require('./db');
const cors = require('cors');
const staffRoutes = require('./routes/staffRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const adminRoutes = require('./routes/adminRoutes');
const employeeDetailRoutes = require('./routes/employeeDetailsRoutes'); 
const leaveallRoutes = require('./routes/adminallleaveRoutes'); 
const stafflogRoute = require('./routes/stafflogRoutes');
const AdminAoorovedRoute = require('./routes/AdminApprovedRoutes');
const EmployeeRoutes = require('./routes/employeeDetailsRoutes');
const AdminDashRoutes = require('./routes/AdminDashboardRoutes');
const StaffDashRoutes = require('./routes/staffDashboardRoutes')
const staffProfileRoute = require('./routes/staffprofileRoutes');
const AdminPendinRoute = require('./routes/adminPendinRoutes');
const AdminRejectedRoute = require('./routes/adminRejectedRoutes');
const emailRouter = require('./routes/emailRouter');
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api',stafflogRoute);
app.use('/admin', adminRoutes);
app.use('/api', staffRoutes);
app.use('/api', leaveRoutes);
app.use('/api', employeeDetailRoutes);
app.use('/api', leaveallRoutes);
app.use('/api',AdminAoorovedRoute);
app.use('/api',EmployeeRoutes);
app.use('/api',AdminDashRoutes);
app.use('/api',staffProfileRoute);
app.use('/api',AdminPendinRoute);
app.use('/api',AdminRejectedRoute);
app.use('/api',StaffDashRoutes)
app.use('/api', emailRouter); 

app.listen(5080, () => {
    console.log("Server is running on port 5080");
});
