const Staff = require('./../models/staff'); 

exports.addStaff = async (req, res) => {
    try {
        const {
            Afirstname,
            Alastname,
            Aemail,
            Apassword,
            Agender,
            Adob,
            Adepartment,
            Aaddress,
            Auser_role,
            Aphonenumber,
            isAdmin,
        } = req.body;

       
        console.log('Incoming Request Body:', req.body);

        
        if (!Afirstname || !Alastname || !Aemail || !Apassword || !Agender || !Adob || !Adepartment || !Aaddress || !Auser_role || !Aphonenumber) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        
        const trimmedEmail = Aemail.trim();
        if (!trimmedEmail) {
            return res.status(400).json({ success: false, message: 'Email is required.' });
        }

        
        const existingStaff = await Staff.findOne({ Aemail: trimmedEmail });
        if (existingStaff) {
            return res.status(400).json({ success: false, message: 'Email already exists. Please use a different email.' });
        }

    
        const newStaff = new Staff({
            Afirstname,
            Alastname,
            Aemail: trimmedEmail, 
            Apassword,
            Agender,
            Adob,
            Adepartment,
            Aaddress,
            Auser_role,
            Aphonenumber,
            isAdmin,
        });

     
        console.log('New Staff Object:', newStaff);

       
        await newStaff.save();

      
        res.status(201).json({ success: true, message: 'Staff records successfully added.' });
    } catch (error) {
        console.error('Error adding staff:', error); // Log the specific error
        res.status(500).json({ success: false, message: 'Error adding staff. Please try again.', error: error.message });
    }
};


