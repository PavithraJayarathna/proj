const mongoose = require('mongoose');

const stafflogSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
});


const Stafflog = mongoose.models.Stafflog || mongoose.model('Stafflog', stafflogSchema);

module.exports = Stafflog;

