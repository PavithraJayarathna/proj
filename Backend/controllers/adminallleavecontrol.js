const LeaveApplication = require('../models/leaveApplication');


exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await LeaveApplication.find()
      
    res.status(200).json(leaves);
  } catch (error) {
    console.error('Error fetching leaves:', error);
    res.status(500).json({ message: 'Error fetching leaves' });
  }
};


exports.updateLeaveStatus = async (req, res) => {
  const { leaveId, status } = req.body;

  

  try {
    const updatedLeave = await LeaveApplication.findByIdAndUpdate(
      leaveId,
      { status: status },
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: 'Leave application not found' });
    }

    res.status(200).json(updatedLeave);
  } catch (error) {
    console.error('Error updating leave status:', error);
    res.status(500).json({ message: 'Error updating leave status' });
  }
};
