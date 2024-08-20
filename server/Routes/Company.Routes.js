const express = require('express');
const { register, login, getAllCompanies, getCompanyById, updateCompany, deleteCompany } = require("../Controller/Company.Controller.js");
const { verifyToken } = require("../Middleware/verifyCompany.js")

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/companies", getAllCompanies);
router.get('/companies/:companyId', verifyToken, getCompanyById);
router.put('/companies/:companyId', verifyToken, updateCompany);
router.delete('/companies/:companyId', verifyToken, deleteCompany);





module.exports = router;