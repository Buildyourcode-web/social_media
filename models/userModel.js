const mongoose = require('mongoose');

// schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNo: { type: String, required: true, unique: true },
  isEmailVerified: { type: Boolean, default: false },
  profilePic: { type: String, default: null },
  userName: { type: String, unique: true, sparse: true, trim: true },
  dob: { type: Date },  // in format: yyyy-mm-dd
  digilocker: {
    aadhaar: { type: String },
    verified: { type: Boolean, default: false },
    profile: { type: Object }
  }
}, { timestamps: true });

// exports
module.exports = mongoose.model('User', userSchema);