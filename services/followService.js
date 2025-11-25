const userModel = require('../models/userModel');
const { sendNotification } = require('../utils/socket')

const followUnfollowService = async (loginUserId, targetUserId) => {
 if (loginUserId === targetUserId) {
      return { status: 400, success: false, message: "You cannot follow yourself" };
    }

    const me = await userModel.findById(loginUserId);
    const target = await userModel.findById(targetUserId);

    if (!target) {
      return { status: 404, success: false, message: "User not found" };
    }

    const alreadyFollowing = me.following.includes(targetUserId);

    // UNFOLLOW
    if (alreadyFollowing) {
      me.following.pull(targetUserId);
      target.followers.pull(loginUserId);

      await me.save();
      await target.save();

      return { status: 200, success: true, following: false, message: "User unfollowed successfully" };
    }

    // FOLLOW
    me.following.push(targetUserId);
    target.followers.push(loginUserId);

    await me.save();
    await target.save();

    const isFollowBack = target.following.includes(loginUserId);

    const message = isFollowBack ? `${me.name} followed you back!` : `${me.name} started following you`;

    // Save notification to DB
    target.notifications.push({ sender: loginUserId, type: isFollowBack ? "follow-back" : "follow", message });

    await target.save();

    // Real-time push notification
    sendNotification(targetUserId, { sender: { _id: me._id, name: me.name }, message, type: isFollowBack ? "follow-back" : "follow", createdAt: new Date() });

    return { status: 200, success: true, following: true, followBack: isFollowBack, message: isFollowBack ? "Followed back!" : "Followed successfully" };
};

const getNotificationsService = async (userId) => {
    const user = await userModel.findById(userId).populate("notifications.sender", "name profilePic");

    return { status: 200, success: true, count: user.notifications.length, notifications: user.notifications.reverse() };
};

module.exports = { followUnfollowService, getNotificationsService };