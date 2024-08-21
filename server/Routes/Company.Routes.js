const express = require('express');
const { register, login, logout, getAllCompanies, getCompanyById, updateCompany, deleteCompany, getCompaniesByCategory } = require("../Controller/Company.Controller.js");
const { verifyToken } = require("../Middleware/verifyCompany.js")

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout)

//Queries
router.get('/companies/filter', getCompaniesByCategory);


// CRUD routes
router.get("/companies", getAllCompanies);
router.get('/companies/:companyId', verifyToken, getCompanyById);
router.put('/companies/:companyId', verifyToken, updateCompany);
router.delete('/companies/:companyId', verifyToken, deleteCompany);






module.exports = router;