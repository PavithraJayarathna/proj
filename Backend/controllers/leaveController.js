const LeaveApplication = require('./../models/leaveApplication');

exports.applyLeave = async (req, res) => {
    try {
        const newLeaveApplication = new LeaveApplication(req.body);
        await newLeaveApplication.save();
        res.status(201).json({ success: true, message: 'Leave application successfully submitted' });
    } catch (error) {
        console.error('Error applying for leave:', error);
        res.status(500).json({ success: false, message: 'Error applying for leave' });
    }
};
