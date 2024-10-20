const express = require('express');
const bcrypt = require('bcrypt'); 
const Staff = require('../models/staff'); 
const router = express.Router();



router.get('/staff/:email', async (req, res) => {
  try {
    const email = req.params.email;

    
    const staff = await Staff.findOne({ Aemail: email });

    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/staff/:email', async (req, res) => {
  const { email } = req.params;
  const { Afirstname, Alastname, Aphonenumber, Agender, Adob, Aaddress, Adepartment, Auser_role } = req.body;

  try {
    
    const staff = await Staff.findOne({ Aemail: email });
    
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    
    staff.Afirstname = Afirstname || staff.Afirstname;
    staff.Alastname = Alastname || staff.Alastname;
    staff.Aphonenumber = Aphonenumber || staff.Aphonenumber;
    staff.Agender = Agender || staff.Agender;
    staff.Adob = Adob || staff.Adob;
    staff.Aaddress = Aaddress || staff.Aaddress;
    staff.Adepartment = Adepartment || staff.Adepartment;
    staff.Auser_role = Auser_role || staff.Auser_role;

    await staff.save(); 

    
    const { Apassword, ...updatedStaffDetails } = staff.toObject();
    res.json(updatedStaffDetails);
  } catch (error) {
    console.error('Error updating staff details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;


