const mongoose = require('mongoose');

// schema
const jobSchema = new mongoose.Schema({
   jobTitle: { type: String, required: true, trim: true },
   companyName: { type: String, required: true, trim: true },
   jobType: { type: String, required: true },
   jobSummary: { type: String, required: true },
   requiredSkills: { type: [String], required: true },
   experienceLevel: { type: String, required: true},
   workLocation: { type: String, required: true },
   salaryRange: {type: Number, required: true },
   postValidityDate: { type: Date, required: true },
   applicationLink: { type: String },
}, { timestamps: true });

// exports
module.exports = mongoose.model('Job', jobSchema);