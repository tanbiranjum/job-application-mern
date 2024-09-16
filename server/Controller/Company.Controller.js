const Company = require("../Model/Company.Model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../Middleware/errorHandler.js")
const path = require('path');




// <!-------------    Auth Controllers     -----------------!>

const register = async (req, res, next) => {
    const { C_Name, C_Email, Password, Category } = req.body;

    try {

        const existingCompany = await Company.findOne({ C_Email });
        if (existingCompany) {
            return res.status(400).json({ success: false, message: "Company already exists with this email!" });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const newCompany = new Company({ C_Name, C_Email, Password: hashedPassword, Category });

        await newCompany.save();

        res.status(201).json({ message: "Company created successfully!" });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { C_Email, Password } = req.body;

    if (!C_Email || !Password) {
        return next(errorHandler(400, "Email and Password are required."));
    }

    try {
        const validCompany = await Company.findOne({ C_Email: C_Email });

        if (!validCompany) return next(errorHandler(404, "User not found!"));

        const validPassword = bcrypt.compareSync(Password, validCompany.Password);

        if (!validPassword) return next(errorHandler(401, "Invalid credentials"));

        const token = jwt.sign({ id: validCompany._id, companyName: validCompany.C_Name }, process.env.JWT_SECRET);

        // Return the token and company details
        const { Password: hashedPassword, ...rest } = validCompany._doc;

        const expiryDate = new Date(Date.now() + 3600000 * 24 * 7)

        //generating the cookie
        res.cookie("access_token", token, {
            httpOnly: false, secure: process.env.NODE_ENV === 'production',
            expires: expiryDate
        });

        res.status(200).json({ ...rest, token });

    } catch (error) {
        next(error);
    }
};


const logout = async (req, res) => {

    res.clearCookie('access_token').status(200).json("Signed Out!")

}


const verifyPassword = async (req, res, next) => {
    const { companyId, password } = req.body;

    try {
        const company = await Company.findById(companyId);
        if (!company) return res.status(404).json({ message: "Company not found!" });

        const validPassword = await bcrypt.compare(password, company.Password);
        if (!validPassword) return res.status(401).json({ message: "Invalid password!" });

        res.status(200).json({ message: "Password verified successfully!" });
    } catch (error) {
        next(error);
    }
};

// <!-------------    CRUD Controllers     -----------------!>

const getAllCompanies = async (req, res) => {

    try {
        const companies = await Company.find();

        if (companies.length == 0) {
            return res.status(404).json({ message: 'No companies found!!' });
        }

        res.json(companies);
    } catch (err) {
        console.error('Error in finding all companies:', err);

        res.status(500).json({ message: err.message });
    }
};


const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.companyId);
        res.json(company);
    } catch (err) {
        console.error('Error in finding company:', err);
        res.json({ message: err });
    }
};

const updateCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        if (!companyId) {
            return res.status(400).send({ message: "Company ID is required" });
        }

        const { C_Name, C_Email, Password, Address, Phone_number, description, Category } = req.body;

        let updateData = { C_Name, C_Email, Address, Phone_number, description, Category };

        if (Password) {
            if (Password.length < 6) {
                return res.status(400).send({ message: "Password should be at least 6 characters long" });
            }
            const hashedPassword = await bcrypt.hash(Password, 10);
            updateData.Password = hashedPassword;
        }

        // Handling file uploads
        if (req.file) {
            const logoPath = path.join('public/logos', req.file.filename);
            updateData.logo = logoPath;
        }

        const updatedCompany = await Company.findByIdAndUpdate(companyId, updateData, { new: true });

        if (!updatedCompany) {
            return res.status(404).send({ message: "Company not found" });
        }

        res.status(200).json(updatedCompany);
    } catch (error) {
        console.error('Error in updating company:', error);
        res.status(500).send({ message: "Error updating company" });
    }
};

const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found!!' });
        }

        await Company.findByIdAndDelete(req.params.companyId);
        res.json({ message: 'Company deleted successfully' });
    } catch (err) {
        console.error('Error in deleting company:', err);
        res.status(500).json({ message: err.message });
    }
};


//<--------------------  Query and Filtering Controllers --------------------->

const getCompaniesByCategory = async (req, res) => {
    try {

        const { Category } = req.query;

        if (!Category) {
            return res.status(400).json({ message: 'Category is required' });
        }

        const companies = await Company.find({ Category });

        if (companies.length === 0) {
            return res.status(200).json([]);
        }

        res.json(companies);
    } catch (err) {
        console.error('Error in finding companies by category:', err);
        res.status(500).json({ message: err.message });
    }
};

const searchCompanies = async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            return res.status(400).json({ message: 'Keyword is required' });
        }

        // Creating a regular expression for case-insensitive ("i") partial matching
        const regex = new RegExp(keyword, 'i');

        // Querying the database with the regex for multiple fields
        const companies = await Company.find({
            $or: [
                { C_Name: { $regex: regex } },
                { C_Email: { $regex: regex } },
                { Category: { $regex: regex } },
                { Address: { $regex: regex } },
            ]
        });


        if (companies.length === 0) {
            return res.status(404).json({ message: `No companies found for keyword: ${keyword}` });
        }

        res.json(companies);
    } catch (err) {
        console.error('Error in searching companies:', err);
        res.status(500).json({ message: err.message });
    }
};


module.exports = { register, login, logout, verifyPassword, getAllCompanies, getCompanyById, updateCompany, deleteCompany, getCompaniesByCategory, searchCompanies };
