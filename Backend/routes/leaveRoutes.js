const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');


router.post('/applyLeave', leaveController.applyLeave);

module.exports = router;
