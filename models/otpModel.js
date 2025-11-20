const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    purpose: { type: String, enum: ['email_verification', 'password_reset'], default: 'email_verification' },
    expiresAt: { type: Date, required: true }   
}, { timestamps: true });

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // auto remove expired OTP docs

module.exports = mongoose.model('Otp', otpSchema);