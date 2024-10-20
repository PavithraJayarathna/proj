// models/adminallleave.js
const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  LeaveType: {
    type: String,
    required: true,
  },
  StartDate: {
    type: Date,
    required: true,
  },
  EndDate: {
    type: Date,
    required: true,
  },
  admin_status: {
    type: Number, 
    default: 0,
  },
});

module.exports = mongoose.model('AllLeave', leaveSchema);
