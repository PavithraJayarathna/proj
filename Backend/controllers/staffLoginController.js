const StaffLogin = require('../models/StaffLogin');

exports.loginStaff = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const staffMember = await StaffLogin.findOne({ email });

    if (!staffMember) {
      
      return res.status(400).json({ message: "Email does not exist" });
    }

    
    if (staffMember.password === password) {
      return res.status(200).json({ message: "Staff login successful", staff: { email } });
    } else {
      return res.status(400).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: "Server error", error });
  }
};
