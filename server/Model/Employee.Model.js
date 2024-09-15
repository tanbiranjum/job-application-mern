const mongoose = require("mongoose");


const employeeSchema = new mongoose.Schema({

    E_Name: {
        type: String,
        required: [true, "Employee name must require"]
    },
    E_Email: {
        type: String,
        required: [true, "Employee email must require"]
    },
    Password:
    {
        type: String,
        required: [true, "Password must require"]
    },
    Gender: {
        type: String,
        enum: ['male', 'female']
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
    Bio: {
        type: String
    },
    Skills: {
        type: [String]
    },
    Experience: {
        type: [String || Number]
    },
    Education: {
        type: [String]
    },
    Photo: {
        type: String,
    },
    Cv: {
        type: String,

    }

}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);