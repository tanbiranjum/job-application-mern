const Company = require("../Model/Company.Model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../Middleware/errorHandler.js")



const register = async (req, res, next) => {
    const { C_Name, C_Email, Password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(Password, 10);

        const newCompany = new Company({ C_Name, C_Email, Password: hashedPassword });

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
        const validCompany = await Company.findOne({ C_Email: C_Email })

        if (!validCompany) return next(errorHandler(404, "User not found!"))

        const validPassword = bcrypt.compareSync(Password, validCompany.Password)

        if (!validPassword) return next(errorHandler(401, "Invalid credentials"))

        const token = jwt.sign({ id: validCompany._id }, process.env.JWT_SECRET);

        //destructuring _doc object and extracting the password and rest of the property of valid company
        const { Password: hashedPassword, ...rest } = validCompany._doc

        const expiryDate = new Date(Date.now() + 3600000 * 24 * 7)

        //generating the cookie
        res.cookie("access_token", token, { httpOnly: true, expires: expiryDate })
            .status(200).json(rest)


    } catch (error) {
        next(error)
    }

};

const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
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
        company.Password = req.body.Password || company.Password;
        company.Address = req.body.Address || company.Address;
        company.DOB = req.body.DOB || company.DOB;
        company.Phone_number = req.body.Phone_number || company.Phone_number;
        company.description = req.body.description || company.description;


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


module.exports = { register, login, getAllCompanies, getCompanyById, updateCompany, deleteCompany };
