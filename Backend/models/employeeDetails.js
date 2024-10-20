const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
  Afirstname: {
    type: String,
    required: true,
  },
  Alastname: {
    type: String,
    required: true,
  },
  Aemail: {
    type: String,
    required: true,
    unique: true,
  },
  Aphonenumber: {
    type: String,
    required: true,
  },
  Adob: {
    type: Date,
    required: true,
  },
  Adepartment: {
    type: String,
    required: true,
  },
});


const Employee = mongoose.model('Employee', employeeSchema);


module.exports = Employee;
