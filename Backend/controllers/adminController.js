const Staff = require('../models/staff'); // Assuming staff model is in models directory
const bcrypt = require('bcrypt'); 

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const staff = await Staff.findOne({ Aemail: email });

        // If no staff found or staff is not an admin
        if (!staff || !staff.isAdmin) {
            return res.status(400).json({ message: "Invalid credentials. Only admin can log in." });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, staff.Apassword);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // If valid admin credentials
        return res.status(200).json({ message: "Admin logged in successfully", admin: { email } });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ message: "Server error", error });
    }
};
