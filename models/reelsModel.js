const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the user who made the comment
    text: { type: String, required: true } // Comment text
}, { timestamps: true });

const reelsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  //Reference to the user who posted the reel
    mediaUrl: { type: String, required: true }, // medial url
    mediaType: { type: String, enum: ["image", "video"], required: true }, // media type - image or video
    description: { type: String },  // Description or caption for the reel
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Users who liked the reel
    comments: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date }
    }],  // Comments on the reel
    isCommentsEnabled: { type: Boolean, default: true },  // comments enabled
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Users who saved the reel
}, { timestamps: true });

module.exports = mongoose.model('Reel', reelsSchema);