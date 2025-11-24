const express = require('express');
const router = express.Router();
const { registerController, verifyEmailOtpController, loginController, usrNameCreateController, usrNameListController } = require('../controllers/authController');
const authMiddleware = require("../middleware/authMiddleware");

// routes
// REGISTER || POST
router.post('/register', registerController);

// SEND OTP || POST
router.post('/verify-email-otp', verifyEmailOtpController);

// VERIFY OTP || POST
router.post('/login', loginController);

// USERNAME CREATE || POST
router.post('/create-username', authMiddleware, usrNameCreateController);

// USERNAME LIST || GET
router.get('/username-list', authMiddleware, usrNameListController);

module.exports = router;