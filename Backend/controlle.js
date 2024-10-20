// controllers/staffController.js
const Staff = require('./models/staff');
const LeaveApplication = require('./models/leaveApplication');

exports.addStaff = async (req, res) => {
    try {
        const newStaff = new Staff(req.body);
        await newStaff.save();
        res.status(201).json({ success: true, message: 'Staff record successfully added' });
    } catch (error) {
        console.error('Error adding staff:', error);
        if (error.code === 11000) { // Handle duplicate email error
            res.status(400).json({ success: false, message: 'Email already exists' });
        } else {
            res.status(500).json({ success: false, message: 'Error adding staff' });
        }
    }
};
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