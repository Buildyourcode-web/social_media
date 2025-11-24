const jobApplicatioinModel = require('../models/jobApplicationModel');

const jobApplicationService = async (data) => {
  const existingApplication = await jobApplicatioinModel.findOne({ jobId: data.jobId, appliedBy: data.appliedBy });
  if (existingApplication) {
    return { status: 400, success: false, message: "You have already applied for this job." };
  }

  const newApplication = new jobApplicatioinModel(data);
  await newApplication.save();

  return { status: 200, success: true, message: "Job application submitted successfully.", data: newApplication };
};

module.exports = { jobApplicationService };
