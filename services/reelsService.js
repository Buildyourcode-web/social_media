const reelsModel = require('../models/reelsModel');
const mongoose = require("mongoose");
const userModel = require('../models/userModel');

// reels create
const reelsCreateService = async (userId, data = {}, file) => {
  const filePath = file ? `/uploads/reels/${file.filename}` : null;
  const mediaType = file.mimetype.startsWith("video/") ? "video" : "image";

  const reelDoc = await reelsModel.create({ user: userId, description: data.description || "", mediaUrl: filePath, mediaType });

  // Populate user details
  let reel = await reelsModel.findById(reelDoc._id).populate("user", "name email profilePic").lean(); // Convert to plain JS object

  const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

  if (reel.user?.profilePic) {
    reel.user.profilePic = `${BASE_URL}${reel.user.profilePic}`;
  }

  if (reel.mediaUrl) {
    reel.mediaUrl = `${BASE_URL}${reel.mediaUrl}`;
  }

  return { status: 201, success: true, message: "Reel created successfully", reel, };
};

// get all reels
const getAllReelsService = async(req, res) => {
  const reels = await reelsModel.find().populate("user", "name email peofilePic").populate("comments.user", "name email profilePic").sort({ createdAt: -1 });

  return { status: 201, success: true, message: "Reels Retrived Successfully", totalReels: reels.length, reels }
};

// like or unlike reels
const likeReelsService = async (rlId, userId) => {
  let reel = await reelsModel.findById(rlId);
  if(!reel)  return res.status(404).json({ message: "Reel or Post not found" });

  const isLiked = reel.likes.includes(userId);
  if(isLiked) {
    reel.likes = reel.likes.filter((id) => id.toString() !== userId.toString()); // unlikes
  } else {
    reel.likes.push(userId);  // likes
  }

  // Populate liked user info
  reel = await reelsModel.findById(rlId).populate("likes", "name profilePic");

  await reel.save();
  return { status: 201, success: true, message: "Toggle Likes Successfull", likesCount: reel.likes.length, isLiked: !isLiked, likedUsers: reel.likes };
};

// add comment
const commentService = async (userId, reelId, text) => {
  const reel = await reelsModel.findById(reelId);
  if (!reel) return { status: 404, success: false, message: "Reel not found" };

  if (!reel.isCommentsEnabled)
    return { status: 403, success: false, message: "Comments are disabled" };

  reel.comments.push({ user: userId, text });
  await reel.save();

  return { status: 201, success: true, message: "Comment Added", comments: reel.comments };
};

// edit comment
const editCmntService = async (userId, reelId, { text, commentId }) => {
  const reel = await reelsModel.findById(reelId);
  if (!reel) return { status: 404, success: false, message: "Reel not found" };

  // Convert string to legit ObjectId
  const formattedId = new mongoose.Types.ObjectId(commentId);

  // Now search with converted ID
  const comment = reel.comments.id(formattedId);

  if (!comment) return { status: 404, success: false, message: "Comment not found" };

  if (comment.user.toString() !== userId.toString()) {
    return { status: 403, success: false, message: "Not allowed" };
  }

  comment.text = text;
  comment.updatedAt = new Date();

  await reel.save();

  return { status: 200, success: true, message: "Comment Updated", comments: reel.comments };
};

const deleteCmntService = async(userId, reelId, { commentId }) => {
  const reel = await reelsModel.findById(reelId);
  if (!reel) return { status: 404, success: false, message: "Reel not found" };

  const comment = reel.comments.id(commentId);

  if (!comment) return { status: 404, success: false, message: "Comment not found" };

  if (comment.user.toString() !== userId.toString() && reel.user.toString() !== userId.toString())
    return { status: 403, success: false, message: "Not allowed to delete" };

  comment.deleteOne();
  await reel.save();

  return { status: 200, success: true, message: "Comment Deleted", comments: reel.comments };
};

const toggleCmntService = async (userId, reelId) => {
 const reel = await reelsModel.findById(reelId);
  if (!reel) return { status: 404, success: false, message: "Reel not found" };

  if (reel.user.toString() !== userId.toString())
    return { status: 403, success: false, message: "Not allowed" };

  reel.isCommentsEnabled = !reel.isCommentsEnabled;
  await reel.save();

  return { status: 200, success: true, message: reel.isCommentsEnabled ? "Comments Enabled" : "Comments Disabled", isCommentsEnabled: reel.isCommentsEnabled };
};

const reelsSaveService = async (userId, reelId) => {
  const reel = await reelsModel.findById(reelId);
  if (!reel) return { status: 404, success: false, message: "Reel not found" };

  if(reel.savedBy.includes(userId)) {
    reel.savedBy.pull(userId);
    await reel.save();
    return { status: 200, success: true, saved: false, message: "Reel removed from saved list" };
  }
  reel.savedBy.push(userId);
  await reel.save();

  return { status: 200, success: true, saved: true, message: "Reel saved successfully" };
};

const reelsGetService = async (userId) => {
 const reels = await reelsModel.find({ savedBy: userId }).populate("user", "name profilePic").sort({ createdAt: -1 });
 return { status: 200, success: true, count: reels.length, reels };
};

module.exports = { reelsCreateService, getAllReelsService, likeReelsService, commentService, editCmntService, deleteCmntService, toggleCmntService, reelsSaveService, reelsGetService };
