const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  Aemail: { type: String, required: true, unique: true },
    Apassword: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
