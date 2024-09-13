const Job = require("../Model/Job.Model.js");
const { errorHandler } = require("../Middleware/errorHandler.js")


// <-------------- CRUD Controllers ---------------->

const createJob = async (req, res, next) => {
    const { title, description, location, job_type, salary, benefits, requirements, responsibilities, skills, application_deadline, Category } = req.body;

    try {
        const newJob = new Job({
            title,
            description,
            location,
            job_type,
            salary,
            benefits,
            requirements,
            responsibilities,
            skills,
            application_deadline,
            company_Id: req.params.companyId,
            Category
        });

        await newJob.save();
        res.status(201).json({ message: "Job created successfully!", job: newJob });
    } catch (error) {
        next(error);
    }
};

const updateJob = async (req, res, next) => {
    const { jobId } = req.params;

    try {
        const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found!" });
        }
        res.status(200).json({ message: "Job updated successfully!", job: updatedJob });
    } catch (error) {
        next(error);
    }
};

const deleteJob = async (req, res, next) => {
    const { jobId } = req.params;

    try {
        const deletedJob = await Job.findByIdAndDelete(jobId);
        if (!deletedJob) {
            return res.status(404).json({ message: "Job not found!" });
        }
        res.status(200).json({ message: "Job deleted successfully!" });
    } catch (error) {
        next(error);
    }
};

const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        if (jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found!" });
        }
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error retrieving jobs:", error);
        res.status(500).json({ message: error.message });
    }
};


const getJobById = async (req, res) => {
    const { jobId } = req.params;

    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found!" });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error("Error retrieving job:", error);
        res.status(500).json({ message: error.message });
    }
};


//<--------------------  Query and Filtering Controllers --------------------->

const getJobsByCategory = async (req, res) => {
    try {
        const { Category } = req.query;

        if (!Category) {
            return res.status(400).json({ message: 'Category is required' });
        }

        const jobs = await Job.find({ Category });

        if (jobs.length === 0) {
            return res.status(200).json([]);
        }

        res.json(jobs);
    } catch (err) {
        console.error('Error in finding jobs by category:', err);
        res.status(500).json({ message: err.message });
    }
};

const getJobsByType = async (req, res) => {
    try {
        const { job_type } = req.query;

        if (!job_type) {
            return res.status(400).json({ message: 'Job type is required' });
        }

        const jobs = await Job.find({ job_type });

        if (jobs.length === 0) {
            return res.status(200).json([]);
        }

        res.json(jobs);
    } catch (err) {
        console.error('Error in finding jobs by type:', err);
        res.status(500).json({ message: err.message });
    }
};


const getCompanyJobs = async (req, res) => {
    try {
      const { companyId } = req.params;
  
      const jobs = await Job.find({ company_Id: companyId });
  
      if (jobs.length === 0) {
        return res.status(200).json([]);
      }
  
      res.json(jobs);
    } catch (err) {
      console.error('Error in finding jobs by company:', err);
      res.status(500).json({ message: err.message });
    }
  };

// Search Jobs
const searchJobs = async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            return res.status(400).json({ message: 'Keyword is required' });
        }

        // Creating a regular expression for case-insensitive ("i") partial matching
        const regex = new RegExp(keyword, 'i');

        // Querying the database with the regex for multiple fields
        const jobs = await Job.find({
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } },
                { location: { $regex: regex } },
                { job_type: { $regex: regex } },
                { skills: { $regex: regex } },
                { responsibilities: { $regex: regex } },
                { requirements: { $regex: regex } },
                { Category: { $regex: regex } }
            ]
        });

        if (jobs.length === 0) {
            return res.status(404).json({ message: `No jobs found for keyword: ${keyword}` });
        }

        res.json(jobs);
    } catch (err) {
        console.error('Error in searching jobs:', err);
        res.status(500).json({ message: err.message });
    }
};

//<---------------- Apply for a Job ---------------->

const applyForJob = async (req, res) => {
    const { jobId } = req.params;
    const employeeId = req.user.id;

    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found!" });
        }

        // Checking if the employee has already applied
        if (job.Applicant.includes(employeeId)) {
            return res.status(400).json({ message: "You have already applied for this job." });
        }

        // Add employee ID to the job's Applicant array
        job.Applicant.push(employeeId);
        await job.save();

        res.status(200).json({ message: "Successfully applied for the job!" });
    } catch (error) {
        console.error("Error applying for job:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
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
};