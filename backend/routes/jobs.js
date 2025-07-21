const express = require('express');
const router = express.Router();

const Job = require('../models/Job');
const { createJob, getJobs } = require('../controllers/jobController');

router.post('/', createJob);   // POST /api/jobs
router.get('/', getJobs);      // GET /api/jobs

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/jobs/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { position, company, jobLocation, jobType, status } = req.body;

    try {
        const updatedJob = await Job.findByIdAndUpdate(
            id,
            { position, company, jobLocation, jobType, status },
            { new: true, runValidators: true } // returns updated doc
        );

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/jobs/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedJob = await Job.findByIdAndDelete(id);

        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
