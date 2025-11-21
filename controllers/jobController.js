const logger = require('../utils/logger');
const { jobCreateValidation, jobUpdateValidation } = require('../validations/jobValidation');
const { jobCreateService, getAllJobsService, getJobByIdService, updateJobService, deleteJobService } = require('../services/jobServices');

const jobCreateController = async (req, res) => {
 const jobCrtVal = jobCreateValidation(req.body);
  if (jobCrtVal.success) {
    try {
      const jbCrt = await jobCreateService(req.body);
      res.status(jbCrt.status).json(jbCrt);
    }
    catch (err) {
      logger.error('Error in Job Create API');
      return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
    }
  } else return res.status(400).send({ success: false, message: jobCrtVal.message });
};

const getAllJobsController = async (req, res) => {
 try {
    const jobLists = await getAllJobsService();
    res.status(jobLists.status).json(jobLists);
  }
  catch (err) {
    logger.error('Error in All Jobs List', err);
    return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
  }
};

const getSingleJobController = async (req, res) => {
 try {
    const jbLst = await getJobByIdService(req.params.id);
    res.status(jbLst.status).json(jbLst);
  }
  catch (err) {
    logger.error('Error in Single Job List', err);
    return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
  }
};

const updateJobController = async (req, res) => {
   const jobUpdtVal = jobUpdateValidation(req.body);
  if (jobUpdtVal.success) {
    try {
      const jbUpdt = await updateJobService(req.params.id, req.body);
      res.status(jbUpdt.status).json(jbUpdt);
    }
    catch (err) {
      logger.error('Error in Job Update API');
      return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
    }
  } else return res.status(400).send({ success: false, message: jobUpdtVal.message });
};
const deleteJobController = async (req, res) => {
  try {
     const jbDel = await deleteJobService(req.params.id);   
     res.status(jbDel.status).json(jbDel);
    } 
  catch (err) {
    logger.error('Error in Delete API', err);
    return res.status(500).send({ success: false, message: 'Internal Server Error', error: err.message });
  }
}

module.exports = { jobCreateController, getAllJobsController, getSingleJobController, updateJobController, deleteJobController };