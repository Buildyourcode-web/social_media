const express = require('express');
const router = express.Router();
const { registerController, verifyEmailOtpController, loginController, profileDetailsController } = require('../controllers/authController');

// routes
// REGISTER || POST
router.post('/register', registerController);

// SEND OTP || POST
router.post('/verify-email-otp', verifyEmailOtpController);

// VERIFY OTP || POST
router.post('/login', loginController);

router.get("/profile", authMiddleware, profileDetailsController);



module.exports = router;