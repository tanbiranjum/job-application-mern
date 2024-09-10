const mongoose = require("mongoose");


const empolyeeSchema = new mongoose.Schema({

    E_Name: {
        type: String,
        require: [true, "Empolyee name must require"]
    },
    E_Email: {
        type: String,
        require: [true, "Empolyee email must require"]
    },
    Password:
    {
        type: String,
        require: [true, "Password must require"]
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
    Photo:{
        type:String,
    }

}, { timestamps: true });

module.exports = mongoose.model('Empolyee', empolyeeSchema);