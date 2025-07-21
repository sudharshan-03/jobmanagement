const Job = require('../models/Job');

const createJob = async (req, res) => {
  try {
    const { position, company, jobLocation, jobType, status, salaryRangeFrom, salaryRangeTo, description, workMode } = req.body;

    // Find logo from mapping
    const companyLogos = {
      "Amazon": "/public/logos/amazon.png",
      "Swiggy": "/public/logos/swiggy.png",
      "Tesla": "/public/logos/tesla.png",
    };

    // Capitalize first letter to match keys (optional if your UI sends lowercase)
    const capitalizedCompany = company.charAt(0).toUpperCase() + company.slice(1).toLowerCase();

    const logoUrl = companyLogos[capitalizedCompany] || "/public/logos/default.png";

    const job = await Job.create({
      position,
      company,
      jobLocation,
      jobType,
      status,
      salaryRangeFrom,
      salaryRangeTo,
      description,
      workMode,
      image: logoUrl  // 👈 set image dynamically
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createJob,
  getJobs
};
