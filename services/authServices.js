const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const otpModel = require('../models/otpModel');
const { sendEmail } = require('../services/emailService');

const SALT_ROUNDS = 10;

const generateToken = (usr) => {
  const payload = { id: usr._id, email: usr.email, name: usr.name, phoneNo: usr.phoneNo };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const registerUserService = async (data) => {
  const exists = await userModel.findOne({ $or: [{ email: data.email }, { phoneNo: data.phoneNo }] });
  if (exists) {
    return { status: 409, success: false, message: 'Email or Phone No is already Registered' };
  }

   const hashed = await bcrypt.hash(data.password, SALT_ROUNDS);
   const user = await userModel.create({ name: data.name, email: data.email, password: hashed, phoneNo: data.phoneNo });

  // generate email OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // remove old otp (important)
  await otpModel.deleteMany({ email: data.email });

  await otpModel.create({ email: data.email, otp, purpose: 'email_verification', expiresAt });

  // send OTP email
  await sendEmail({ to: data.email, subject: 'Verify your email', text: `Your OTP is ${otp}. Expires in 10 minutes.` });
  
  return { status: 200, success: true, message: 'User registered. Verify email OTP to activate account.', user };
};

const vrfyEmailService = async (data) => {
    const record = await otpModel.findOne({ email: data.email, otp: Number(data.otp), purpose: 'email_verification' });
    if (!record) return { status: 400, success: false, message: 'Invalid or expired OTP' };

    // mark user verified
    const vrfyUser = await userModel.findOneAndUpdate({ email: data.email }, { isEmailVerified: true }, { new: true });
    if (!vrfyUser) return { status:404, success: false, message: 'User not found' };

    // delete OTP
    await record.deleteOne();

    const token = generateToken(vrfyUser);
    return { status: 200, success: true, message: 'Email verified', token };
};

const loginUserService = async(data) => {
    const lgnUser = await userModel.findOne({ email: data.email }).select('+password');
    if (!lgnUser) return { status: 400, success: false, message: 'Invalid credentials' };

    const ok = await bcrypt.compare(data.password, lgnUser.password);
    if (!ok) return { status: 400,  success: false, message: 'Invalid credentials' };

    const token = generateToken(lgnUser);
     const user = {
    id: lgnUser._id,
    name: lgnUser.name,
    email: lgnUser.email,
    phoneNo: lgnUser.phoneNo,
    isEmailVerified: lgnUser.isEmailVerified,
    createdAt: lgnUser.createdAt
  };
    return { status: 200, success: true, message: 'Login Successful', token, user };
};

const usrNameCreateService = async(userId, data) => {
  const user = await userModel.findById(userId);
  if(!user) return { status: 404, success: false, message: "User not found" };

  const checkUserName = await userModel.findOne({ username: data.userName });
  if(checkUserName) return { status: 409, success: false, message: "Username already taken" };

  user.userName = data.userName;
  await user.save();

  return { status: 200, success: true, message: "Username updated successfully", user };
};

const userNameListService = async(userId) => {  
  const user = await userModel.findById(userId);
  if(!user) return { status: 404, success: false, message: "User not found" };
  else return { status: 200, success: true, message: "Username fetched successfully", user: userNLst.userName };
};

module.exports = { registerUserService, vrfyEmailService, loginUserService, usrNameCreateService, userNameListService }