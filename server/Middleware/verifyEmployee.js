const jwt = require('jsonwebtoken')

const verifyEmployee = (req, res, next) => {
  const { authorization } = req.headers

  try {
    if (!authorization) {
      throw new Error("Authentication token missing");
    }
    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.name = decoded.name
    req.id = decoded.id
    next()
  } catch (error) {
    next("authentication failure")
  }
}

module.exports = verifyEmployee