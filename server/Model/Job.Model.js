const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({

    title: {
        type: String,
        required: [true, "title must requied"]
    },
    description: {
        type: String,
        required: [true, "Description must requied"]
    },
    location: {
        type: String,
        required: [true, "location must requied"]
    },
    job_type: {
        type: String,
        required: true,
        enum: ['full_time', 'part_time', 'contract', 'internship', 'temporary']
    },
    salary: {
        type: Number
    },
    benefits: {
        type: [String]
    },
    requirements: {
        type: [String]
    },
    responsibilities: {
        type: [String]
    },
    skills: {
        type: [String]
    },
    posted_at: {
        type: Date,
        default: Date.now
    },
    application_deadline: {
        type: Date
    },
    status: {
        type: String,
        required: true,
        enum: ['open', 'closed'], default: 'open'
    },

    company_Id: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    Applicant: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Empolyee'
        }
    ],

}, { timestamps: true });


module.exports = mongoose.model("Job", jobSchema);