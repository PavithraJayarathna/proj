const mongoose = require("mongoose");

const staffLoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const StaffLogin = mongoose.model('StaffLogin', staffLoginSchema);

module.exports = StaffLogin;
