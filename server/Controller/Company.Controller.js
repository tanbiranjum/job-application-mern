const Company = require("../Model/Company.Model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../Middleware/errorHandler.js")



// <!-------------    Auth Controllers     -----------------!>

const register = async (req, res, next) => {
    const { C_Name, C_Email, Password, Category } = req.body;

    try {
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

        const token = jwt.sign({ id: validCompany._id }, process.env.JWT_SECRET);

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
        const company = await Company.findById(req.params.companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found!!' });
        }

        company.C_Name = req.body.C_Name || company.C_Name;
        company.C_Email = req.body.C_Email || company.C_Email;
        company.Address = req.body.Address || company.Address;
        company.DOB = req.body.DOB || company.DOB;
        company.Phone_number = req.body.Phone_number || company.Phone_number;
        company.description = req.body.description || company.description;
        company.Category = req.body.Category || company.Category;

        if (req.body.Password) {
            company.Password = await bcrypt.hash(req.body.Password, 10);
        }


        const updatedCompany = await company.save();
        res.json(updatedCompany);
    } catch (err) {
        console.error('Error in updating company:', err);
        res.status(500).json({ message: err.message });
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


module.exports = { register, login, logout, getAllCompanies, getCompanyById, updateCompany, deleteCompany, getCompaniesByCategory, searchCompanies };
