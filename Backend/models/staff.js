const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const staffSchema = new mongoose.Schema({
    Afirstname: { type: String, required: true },
    Alastname: { type: String, required: true },
    Aemail: { type: String, required: true, unique: true },
    Apassword: { type: String, required: true },
    Agender: { type: String, required: true },
    Adob: { type: Date, required: true },
    Adepartment: { type: String, required: true },
    Aaddress: { type: String, required: true },
    Auser_role: { type: String, required: true },
    Aphonenumber: { type: String, required: true },
    isAdmin: { type: Boolean, default: false } // New field to mark an admin
});

staffSchema.pre('save', async function(next) {
    if (this.isModified('Apassword')) {
        const salt = await bcrypt.genSalt(10);
        this.Apassword = await bcrypt.hash(this.Apassword, salt);
    }
    next();
});

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;
