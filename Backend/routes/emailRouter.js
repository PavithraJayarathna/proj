const express = require('express');
const ContactMessage = require('../models/contactMessage');
; 
const router = express.Router();
require('dotenv').config();  


router.post('/send-email', async (req, res) => {
  const { name,email, message } = req.body;

  try {
    
    const newMessage = new ContactMessage({
      name,
      email,
      message,
    });
    await newMessage.save();  

    res.status(200).send('Message stored successfully'); 
  } catch (error) {
    console.error('Error saving message to database:', error);
    res.status(500).send('Error saving message to database');
  }
});

module.exports = router;


