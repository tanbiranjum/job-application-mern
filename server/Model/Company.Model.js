const mongoose = require("mongoose");


const companySchema = new mongoose.Schema({

    C_Name: {
        type: String,
        require: [true, "Company name must require"]
    },
    C_Email: {
        type: String,
        require: [true, "Company email must require"]
    },
    Password:
    {
        type: String,
        require: [true, "Password must require"]
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


}, { timestamps: true })

module.exports = mongoose.model('Company', companySchema);