const logger = require('../utils/logger');
const { reelsCreateService, getAllReelsService, likeReelsService, commentService, editCmntService, deleteCmntService, toggleCmntService, reelsSaveService, reelsGetService } = require('../services/reelsService');


const reelCreateController = async (req, res) => {
    try {
        const rlsCrt = await reelsCreateService(req.user.id, req.body, req.file);
        res.status(rlsCrt.status).json(rlsCrt);
    }
    catch (err) {
        logger.error('Error in Reels Create API');
        return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
    }
};

const getAllReelsController = async (req, res) => {
    try {
        const rlsLst = await getAllReelsService();
        res.status(rlsLst.status).json(rlsLst);
    }
    catch (err) {
        logger.error('Error in Get Reels List API', err);
        return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
    }
};

const likesReelController = async (req, res) => {
    try {
        const rlsLikes = await likeReelsService(req.params.id, req.user.id);
        res.status(rlsLikes.status).json(rlsLikes);
    }
    catch (err) {
        logger.error('Error in Reels Likes API', err);
        return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
    }
};

const commentController = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text?.trim()) {
      return res.status(400).json({ success: false, message: "Text is required" });
    }
    const response = await commentService(req.user.id, req.params.id, text);

    return res.status(response.status).json(response);
  } catch (err) {
    logger.error("Error in Comment Add API", err);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
  }
};

const editCmntController = async (req, res) => {
  try {
    const body = req.body || {};

    const text = body.text || null;
    const commentId = body.commentId || null;

    if (!text?.trim()) {
      return res.status(400).json({ success: false, message: "Text is required" });
    }
    const response = await editCmntService(req.user.id, req.params.id, { text,commentId });

    return res.status(response.status).json(response);
  } catch (err) {
    logger.error("Error in Comment Edit API", err);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
  }
};

const deleteCmntController = async (req, res) => {
try {
    const body = req.body || {};
    const commentId = body.commentId || null;

    const response = await deleteCmntService(req.user.id, req.params.id, { commentId });

    return res.status(response.status).json(response);
  } catch (err) {
    logger.error("Error in Comment DELETE API", err);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
  }
};

const toggleReelController = async (req, res) => {
  try {
    const response = await toggleCmntService(req.user.id, req.params.id);
    return res.status(response.status).json(response);
  } catch (err) {
    logger.error("Error in Comment TOGGLE API", err);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
  }
};

const reelsSaveController = async (req, res) => {
 try {
    const response = await reelsSaveService(req.user.id, req.params.id);
    return res.status(response.status).json(response);
  } catch (err) {
    logger.error("Error in Comment TOGGLE API", err);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
  }
};

const reelsGetController = async (req, res) => {
 try {
    const response = await reelsGetService(req.user.id);
    return res.status(response.status).json(response);
  } catch (err) {
    logger.error("Error in Comment TOGGLE API", err);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
  }
};

module.exports = { reelCreateController, getAllReelsController, likesReelController, commentController, editCmntController, deleteCmntController, toggleReelController,  reelsSaveController, reelsGetController };