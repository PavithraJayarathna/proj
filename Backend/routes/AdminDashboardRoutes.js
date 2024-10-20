const express = require('express');
const router = express.Router();
const Staff = require('../models/staff'); 
const LeaveApplication = require('../models/leaveApplication');


router.get('/dashboard-stats', async (req, res) => {
  try {


    const totalStaff = await Staff.countDocuments();

    
    
    const approvedLeaves = await LeaveApplication.countDocuments({ status: 'Approved' });
    const pendingLeaves = await LeaveApplication.countDocuments({ status: 'Pending' });
    const rejectedLeaves = await LeaveApplication.countDocuments({ status: 'Rejected' });

   
    res.status(200).json({
      totalStaff,
      
      approvedLeaves,
      pendingLeaves,
      rejectedLeaves
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

module.exports = router;

