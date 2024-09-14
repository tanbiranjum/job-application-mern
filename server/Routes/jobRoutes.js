const express = require('express');
const {
    createJob,
    updateJob,
    deleteJob,
    getAllJobs,
    getJobById,
    applyForJob,
    getJobsByCategory,
    getJobsByType,
    searchJobs,
    getCompanyJobs
} = require('../Controller/jobController.js');

const router = express.Router();

// Queries
router.get('/filter', getJobsByCategory);
router.get('/type', getJobsByType);
router.get('/search', searchJobs);
router.get('/company/:companyId', getCompanyJobs);

// CRUD Routes
router.get('/', getAllJobs);
router.get('/:jobId', getJobById);
router.post('/create/:companyId', createJob);
router.put('/update/:jobId', updateJob);
router.delete('/delete/:jobId', deleteJob);
router.post('/apply/:jobId', applyForJob);


module.exports = router;