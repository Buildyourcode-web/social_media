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
  followRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // follow requests
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // friends
  profileVisibility: { type: String, enum: ["public", "private", "friends"], default: "public"}, // public, private, friends
  blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // block functionality
  notifications: [notificationSchema],
  walletBalance: { type: Number, default: 0 }, // coins
  location: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: { type: [Number], default: [0, 0] } }, // [longitude, latitude]
}, { timestamps: true });

// exports
module.exports = mongoose.model('User', userSchema);