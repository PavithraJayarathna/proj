const mongoose = require('mongoose');

const leaveApplicationSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    leaveType: { 
        type: String, 
        required: true,
        enum: ['sick', 'vacation', 'maternity'] 
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: {type: String, required: true, default: 'Pending', enum: ['Pending', 'Approved', 'Rejected']},
});

const LeaveApplication = mongoose.model('LeaveApplication', leaveApplicationSchema);

module.exports = LeaveApplication;
