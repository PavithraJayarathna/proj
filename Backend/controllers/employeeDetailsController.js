const Employee = require('../models/employeeDetails'); // Update to use the new model name


const getAllEmployeeDetails = async (req, res) => {
  try {
    const employeeList = await Employee.find(); // Fetch all employees from the database
    res.json(employeeList);
  } catch (error) {
    console.error('Error fetching employee details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const deleteEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Employee.findByIdAndDelete(id);
    if (result) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  getAllEmployeeDetails,
  deleteEmployeeById,
};
