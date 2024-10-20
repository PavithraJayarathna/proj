const express = require('express');
const LeaveApplication = require('../models/leaveApplication');
const router = express.Router();


router.get('/leaves/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const leaves = await LeaveApplication.find({ email: email }); 
        res.json(leaves);
    } catch (error) {
        console.error("Error fetching leaves:", error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
