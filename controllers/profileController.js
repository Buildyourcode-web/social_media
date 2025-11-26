const logger = require('../utils/logger');
const { updtUsrValidation } = require('../validations/profileValidation');
const { getProfileDetailsService, updateProfileImageService, updtUsrPrflService, forgotPasswordService, verifyOtpService, rstPswdService, chngePswdService, visibilityService, blockUserService, blockUserListService, unblockUserService } = require('../services/profileServcie');

const profileDetailsController = async (req, res) => {
  try {
    const userId = req.params.id.trim(); 

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await getProfileDetailsService(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile details fetched successfully",
      data: user,
    });

  } catch (err) {
    logger.error("Error in Profile Details API", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const updateProfileImageController = async (req, res) => {
   try {
        const updtImg = await updateProfileImageService(req.user.id,req.file);
        res.status(updtImg.status).json(updtImg);
    }
    catch (err) {
        logger.error('Error in Profile Image API');
        return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
    }
};

const updateUserProfileController = async (req, res) => {
  try {
    const jbCrt = await updtUsrPrflService(req.user.id,req.body);
    res.status(jbCrt.status).json(jbCrt);
  }
  catch (err) {
    logger.error('Error in User Profile Update API');
    return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const fgtPswd = await forgotPasswordService(req.body);
    res.status(fgtPswd.status).json(fgtPswd);
  } catch (err) {
    logger.error('Error in Forgot Password API');
    return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
  }
};  

const vrfyOtpController = async (req, res) => {
  try {
    const vrfyOtp = await verifyOtpService(req.body);
    res.status(vrfyOtp.status).json(vrfyOtp);
  } catch (error) {
    logger.error('Error in Verify OTP API');
    return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
  }
};

const rstPswdController = async (req, res) => { 
  try {
    const rstPswd = await rstPswdService(req.body);
    res.status(rstPswd.status).json(rstPswd);
  } catch (err) {
    logger.error('Error in Reset Password API');
    return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
  }
};

const chngePswdController = async (req, res) => {
  try {
    const chngPswd = await chngePswdService(req.user.id, req.body);
    res.status(chngPswd.status).json(chngPswd);
  } catch (err) {
    logger.error('Error in Change Password API');
    return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
  }
};

const visibilityController = async (req, res) => {
   try {
    const vsbility = await visibilityService(req.user.id, req.body);
    res.status(vsbility.status).json(vsbility);
  } catch (err) {
    logger.error('Error in Profile Visibility API');
    return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
  }
};
 
const blockUserController = async (req, res) => {
  try {
    const response = await blockUserService(req.user.id, req.params.id);
    res.status(response.status).json(response);
  } catch (err) {
    logger.error('Error in Block User API');
    return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
  }
};

const blockUserListController = async (req, res) => {
  try {
    const response = await blockUserListService(req.user.id);
    res.status(response.status).json(response);
  } catch (err) {
    logger.error('Error in Block User List API');
    return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
  }
};

const unblockUserController = async (req, res) => {
  try {
    const response = await unblockUserService(req.user.id, req.params.id);
    res.status(response.status).json(response);
  } catch (err) {
    logger.error('Error in Block User API');
    return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
  }
};

module.exports = { profileDetailsController, updateProfileImageController, updateUserProfileController, forgotPasswordController, vrfyOtpController, rstPswdController, chngePswdController, visibilityController, blockUserController, blockUserListController, unblockUserController };