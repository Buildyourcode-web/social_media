const logger = require('../utils/logger');
const  { registerValidation, verifyEmailValidation, loginValidation } = require('../validations/authValidation');
const  { registerUserService, vrfyEmailService, loginUserService, getProfileDetailsService } = require('../services/authServices');

const registerController = async (req, res) => {
  const userRegVal = registerValidation(req.body);
  if (userRegVal.success) {
    try {
      const user = await registerUserService(req.body);
      res.status(user.status).json(user);
    }
    catch (err) {
      logger.error('Error in Register API');
      return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
    }
  } else return res.status(400).send({ success: false, message: userRegVal.message });

};

const verifyEmailOtpController = async (req, res) => {
    const vrfyEmlVal = verifyEmailValidation(req.body);
    if (vrfyEmlVal.success) {
        try {
            const vrfyEmil = await vrfyEmailService(req.body);
            res.status(vrfyEmil.status).json(vrfyEmil);
        }
        catch (err) {
            logger.error('Error in Verify Email API');
            return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
        }
    } else return res.status(400).send({ success: false, message: vrfyEmlVal.message });
} 

const loginController = async (req, res) => {
    const lgnVal = loginValidation(req.body);
    if(lgnVal.success) {
        try {
            const lgnUsr = await loginUserService(req.body);
            res.status(lgnUsr.status).json(lgnUsr);
        } catch (err) {
            logger.error('Error in Login API');
            return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
        }
    } else return res.status(400).send({ success: false, message: lgnVal.message });
}
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



module.exports = { registerController, verifyEmailOtpController, loginController, profileDetailsController };