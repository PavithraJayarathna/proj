const express = require('express');
const { loginAdmin } = require('../controllers/adminController');
const router = express.Router();
const cors = require('cors');


router.use(cors());

router.post('/login', loginAdmin);

module.exports = router;
