const jwt = require("jsonwebtoken")
const { errorHandler } = require("./errorHandler")

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, "Company is not authenticated!"))
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, company) => {
        if (err) return next(errorHandler(403, "Token is not valid"))

        req.company = company;
        next()
    })
}

module.exports = {verifyToken}