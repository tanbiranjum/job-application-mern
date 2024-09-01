const jwt = require("jsonwebtoken")
const { errorHandler } = require("./errorHandler")

const verifyToken = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    console.log("Token:", token);

    if (!token) {
        console.error("Token is missing.");
        return next(errorHandler(401, "Company is not authenticated!"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Token Verification Error:", err.message);
            return next(errorHandler(403, "Token is not valid"));
        }

        req.companyId = decoded.id;
        next();
    });
};

module.exports = { verifyToken }