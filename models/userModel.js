const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["follow", "follow-back"], required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

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
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  notifications: [notificationSchema]
}, { timestamps: true });

// exports
module.exports = mongoose.model('User', userSchema);