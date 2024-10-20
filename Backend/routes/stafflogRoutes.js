const express = require('express');
const bcrypt = require('bcrypt'); 
const Staff = require('../models/staff'); 
const router = express.Router();


router.post('/stafflogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const staff = await Staff.findOne({ Aemail: email });
        if (!staff) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        
        const isPasswordValid = await bcrypt.compare(password, staff.Apassword);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during staff login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
});

module.exports = router;

