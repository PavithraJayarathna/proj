const express = require('express');
const Staff = require('../models/staff'); 
const router = express.Router();


router.get('/employeedetails', async (req, res) => {
  try {
    const staffList = await Staff.find(); 
    res.json(staffList); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff details' });
  }
});


router.delete('/deleteemployee/:id', async (req, res) => {
  try {
    const staffId = req.params.id;
    const deletedStaff = await Staff.findByIdAndDelete(staffId); 
    if (!deletedStaff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.json({ success: true, message: 'Staff member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting staff member' });
  }
});

module.exports = router;

