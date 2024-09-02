const jwt = require("jsonwebtoken")
const { errorHandler } = require("./errorHandler")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        console.error("Authorization header is missing or not formatted correctly.");
        return next(errorHandler(401, "Company is not authenticated!"));
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Token Verification Error:", err.message);
            return next(errorHandler(403, "Token is not valid"));
        }

        req.companyId = decoded.id;
        next();
    });
};

module.exports = { verifyToken };