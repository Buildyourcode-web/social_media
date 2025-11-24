const fs = require("fs");
const path = require("path");
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const otpModel = require('../models/otpModel');
const { sendEmail } = require('../services/emailService');

const getProfileDetailsService = async (userId) => {
  return await userModel.findById(userId).select("-password -otp -__v");
};

const updateProfileImageService = async (userId, file) => {
  if (!file) {
    return { status: 400, success: false, message: 'No image uploaded' };
  }

  const newImagePath = `/uploads/${file.filename}`;

  const userD = await userModel.findById(userId);
  if (!userD) {
    return { status: 400, success: false, message: 'User not found' };
  }

  // Delete old image if exists
  if (userD.profilePic) {
      const oldImagePath = path.join(__dirname, "..", userD.profilePic);
      if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
      }
  }

  // Update DB
  userD.profilePic = newImagePath;
  await userD.save();

  return { status: 200, success: true, message: 'Profile image updated successfully', image: newImagePath};
};

const updtUsrPrflService = async (usrId, data) => {
  const userUp = await userModel.findById(usrId);
  if (!userUp) {
    return { status: 404, success: false, message: "User not found" };
  }

//  update email
  const newEmail = data.email ? data.email.trim().toLowerCase() : null;
  const oldEmail = userUp.email ? userUp.email.trim().toLowerCase() : null;

  if (newEmail && newEmail !== oldEmail) {
  const emailExists = await userModel.findOne({ email: newEmail });
  if (emailExists) {
    return { status: 409, success: false, message: "Email already in use" };
  }
  userUp.email = newEmail;
  }

  // Update Phone Number
  if (data.phoneNo && data.phoneNo !== userUp.phoneNo) {
  const phoneExists = await userModel.findOne({ phoneNo: data.phoneNo });
  if (phoneExists) {
    return { status: 409, success: false, message: "Phone number already in use" };
  }
  userUp.phoneNo = data.phoneNo;
  }

  // Update Username
  if (data.userName && data.userName !== userUp.userName) {
  const userNameExists = await userModel.findOne({ userName: data.userName });
  if (userNameExists) {
    return { status: 409, success: false, message: "Username already taken" };
  }
  userUp.userName = data.userName;
  }

  if (data.name) userUp.name = data.name;
  if (data.dob) userUp.dob = data.dob;

  await userUp.save();

  return { status: 200, success: true, message: "User profile updated successfully", data: userUp };
};

const forgotPasswordService = async (data) => {
  const user = await userModel.findOne({ email: data.email });
  if(!user) {
    return { status: 404, success: false, message: "User with this email does not exist" };
  };

   // generate email OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // remove old otp (important)
  await otpModel.deleteMany({ email: data.email });

  await otpModel.create({ email: data.email, otp, purpose: 'password_reset', expiresAt });  
  // send OTP email
  await sendEmail({ to: data.email, subject: 'Password Reset OTP', text: `Your OTP for password reset is ${otp}. Expires in 10 minutes.` });      
  return { status: 200, success: true, message: 'OTP sent to email for password reset' };
};

const verifyOtpService = async (data) => {
  const otpRecord = await otpModel.findOne({ email: data.email, otp: data.otp, purpose: 'password_reset', expiresAt: { $gt: new Date() } });
  if (!otpRecord) {
    return { status: 400, success: false, message: 'Invalid or expired OTP' };  
  }
  return { status: 200, success: true, message: 'OTP verified successfully' };
};

const rstPswdService = async (data) => {
  const user = await userModel.findOne({ email: data.email });    
  if(!user) {
    return { status: 404, success: false, message: "User with this email does not exist" };
  };

  const hashedPassword = await bcrypt.hash(data.newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  // delete OTP after successful password reset
  await otpModel.deleteMany({ email: data.email, purpose: 'password_reset' });

  return { status: 200, success: true, message: 'Password reset successfully' };
};  

const chngePswdService = async (usrID, data) => {
  const { currentPassword, newPassword, confirmPassword } = data;

  const userChg = await userModel.findById(usrID).select('+password');
  if(!userChg) return { status: 404, success: false, message: "User not found" };

  const isMatch = await bcrypt.compare(currentPassword, userChg.password);
  if(!isMatch) return { status: 400, success: false, message: "Current password is incorrect" };

  if(newPassword !== confirmPassword) return { status: 400, success: false, message: "New password and confirm password must be same" };
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  userChg.password = hashedNewPassword;
  await userChg.save();

  return { status: 200, success: true, message: "Password changed successfully" };
};

module.exports = { getProfileDetailsService, updateProfileImageService, updtUsrPrflService, forgotPasswordService, verifyOtpService, rstPswdService, chngePswdService };