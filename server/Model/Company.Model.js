const mongoose = require("mongoose");
const categories = require('../Others/categories.js');

const companySchema = new mongoose.Schema({
    C_Name: {
        type: String,
        required: [true, "Company name must require"]
    },
    C_Email: {
        type: String,
        required: [true, "Company email must require"]
    },
    Password: {
        type: String,
        required: [true, "Password must require"]
    },
    DOB: {
        type: Date
    },
    Address: {
        type: String
    },
    Phone_number: {
        type: String
    },
    description: {
        type: String
    },
    Category: {
        type: String,
        enum: categories,
        required: [true, "Category is required"]
    },
    logo: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);