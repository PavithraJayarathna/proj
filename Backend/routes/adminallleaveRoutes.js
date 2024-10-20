const express = require('express');
const router = express.Router();
const adminAllLeaveController = require('../controllers/adminallleavecontrol');


router.get('/allLeaves', adminAllLeaveController.getAllLeaves);


router.put('/updateLeaveStatus', adminAllLeaveController.updateLeaveStatus);

module.exports = router;
