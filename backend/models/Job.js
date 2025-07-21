const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    default: 'Remote',
  },
  jobType: {
    type: String,
    enum: ['Fulltime', 'Parttime', 'Internship', 'Contract'],
    default: 'Fulltime',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  salaryRangeFrom: {
    type: String,
  },
  salaryRangeTo: {
    type: String,
  },
  description: {
    type: String,
  },
  applicationDeadline: {
    type: String,
  },
  experience: {
    type: String,
  },
  workMode: {
    type: String,
    enum: ['Onsite', 'Remote', 'Hybrid'],
    default: 'Onsite',
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/150', // default image
  }
});

module.exports = mongoose.model('Job', jobSchema);
