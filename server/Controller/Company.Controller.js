const Company = require("../Model/Company.Model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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

module.exports = { register, login };
