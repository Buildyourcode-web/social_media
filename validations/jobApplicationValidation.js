const jbAplctnValidation = (body) => {
  const { jobId, appliedBy, fullName, email, phoneNumber, totalExperience, currentSalary, expectedSalary } = body;
  if (!jobId || !appliedBy || !fullName || !email || !phoneNumber || !totalExperience || !currentSalary || !expectedSalary) {
    return { success: false, message: "Missing required fields" };
  }
  return { success: true };
};

module.exports = { jbAplctnValidation };
