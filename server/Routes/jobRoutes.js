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
    getCompanyJobs,
    getJobApplicants,
    getAppliedJobs
} = require('../Controller/jobController.js');
const { verifyEmployee } = require('../Middleware/verifyEmployee.js');

const router = express.Router();

// Queries
router.get('/filter', getJobsByCategory);
router.get('/type', getJobsByType);
router.get('/search', searchJobs);
router.get('/applied/:id', verifyEmployee, getAppliedJobs);
router.get('/company/:companyId', getCompanyJobs);
router.get('/applicants/:jobId', verifyEmployee, getJobApplicants);


// CRUD Routes
router.get('/', getAllJobs);
router.get('/:jobId', getJobById);
router.post('/create/:companyId', createJob);
router.put('/update/:jobId', updateJob);
router.delete('/delete/:jobId', deleteJob);
router.post('/apply/:jobId', verifyEmployee, applyForJob);


module.exports = router;