const express = require('express');
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware');
const { profileDetailsController, updateProfileImageController, updateUserProfileController, forgotPasswordController, vrfyOtpController, rstPswdController, chngePswdController } = require('../controllers/profileController');

const router = express.Router();

// routes
// Profile Details || GET
router.get("/profile-view/:id", authMiddleware, profileDetailsController);

// Profile Image || PUT
router.put("/profile-image", authMiddleware, upload.single('profilePic'), updateProfileImageController);

// UPDATE USER PROFILE DATA || PUT
router.put("/update-user-profile/:id", authMiddleware, updateUserProfileController);

// FORGOT PASSWORD || POST 
router.post('/forgot-password', authMiddleware, forgotPasswordController);

// VERIFY OTP || POST
router.post('/verify-otp', authMiddleware, vrfyOtpController);

// RESET PASSWORD || POST
router.post('/reset-password', authMiddleware, rstPswdController);

// CHANGE PASSWORD || PUT
router.put('/change-password', authMiddleware, chngePswdController);

module.exports = router;