const express = require('express');
const LeaveApplication = require('../models/leaveApplication'); // Adjust the path accordingly
const router = express.Router();

router.get('/approvedLeaves', async (req, res) => {
    try {
        const approvedLeaves = await LeaveApplication.find({ status: 'Approved' });
        res.json(approvedLeaves);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching approved leaves' });
    }
});

module.exports = router;
