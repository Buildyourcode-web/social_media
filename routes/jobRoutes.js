const express = require('express');
const { jobCreateController, getAllJobsController, getSingleJobController, updateJobController, deleteJobController } = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// routes
// CREATE JOB || POST
router.post('/create-job', authMiddleware, jobCreateController);

// JOB LIST || GET ALL JOBS
router.get('/all-jobs-list',  authMiddleware, getAllJobsController);

// JOB LIST || GET JOB BY ID
router.get('/job-details/:id', authMiddleware, getSingleJobController);

// JOB UPDATE || PUT
router.put('/job-update/:id', authMiddleware, updateJobController);

// DELETE JOB || DELETE
router.delete('/job-delete/:id', authMiddleware, deleteJobController);

module.exports = router;