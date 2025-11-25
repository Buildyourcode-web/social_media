const logger = require('../utils/logger');
const { followUnfollowService, getNotificationsService } = require('../services/followService');

const followUnfollowController = async (req, res) => {
    try {
      const response = await followUnfollowService(req.user.id, req.params.id);
      res.status(response.status).json(response);
    }
    catch (err) {
      logger.error('Error in Follow & Unfollow API');
      return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
    }
};

const getNotificationsController = async (req, res) => {
    try {
      const response = await getNotificationsService(req.user.id);
      res.status(response.status).json(response);
    }
    catch (err) {
      logger.error('Error in Follow & Unfollow API');
      return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
    }
}

module.exports = { followUnfollowController, getNotificationsController };