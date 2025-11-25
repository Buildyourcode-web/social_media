const express = require('express');
const { followUnfollowController, getNotificationsController} = require('../controllers/followController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// routes
// FOLLOW & UNFOLLOW || POST /api/follow/user-follow
router.post('/user-follow/:id', authMiddleware, followUnfollowController);

// GET NOTIFICATION || GET /api/follow/get-notification
router.get("/get-notification", authMiddleware, getNotificationsController);
module.exports = router;