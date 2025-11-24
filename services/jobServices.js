const jobModel = require('../models/jobModel');

const jobCreateService = async (data) => {
  const jbCrt = await jobModel.create(data);
  return { status: 200, success: true, message: 'Job Created Successfully', jbCrt };
};

const getAllJobsService = async () => {
    const jobs = await jobModel.find().sort({ createdAt: -1});
    return { status: 200, success: true, message: 'All Job List Retrived Successfully',data: jobs };
};

const getJobByIdService = async (jobId) => {
   const job = await jobModel.findById(jobId);
   if (!job) {
    return { status: 404, success: false, message: 'Job not found' };
   } else {
    return { status: 200, success: true, message: 'Job Retrived Successfully', data: job };
   }
};

const updateJobService = async (jobId, data) => {
  const job = await jobModel.findByIdAndUpdate(jobId, data, { new: true });
  if (!job) {
    return { status: 404, success: false, message: 'Job not found' };       
  } else {
    return { status: 200, success: true, message: 'Job Updated Successfully', data: job };
  }
};   

const deleteJobService = async (jobId) => {
  const jobDel = await jobModel.findByIdAndDelete(jobId);
  return { status: 200, success: true, message: 'Job Deleted Successfully' };
};

const getJobsByUserService = async (userId) => {
  const jobs = await jobModel.find({ createdBy: userId }).sort({ createdAt: -1 });
  return { status: 200, success: true, message: 'Jobs retrieved successfully', data: jobs };
};

module.exports = { jobCreateService, getAllJobsService, getJobByIdService, updateJobService, deleteJobService, getJobsByUserService };