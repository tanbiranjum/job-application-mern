const express = require('express');
const { register, login, logout, verifyPassword, getAllCompanies, getCompanyById, updateCompany, deleteCompany, getCompaniesByCategory, searchCompanies } = require("../Controller/Company.Controller.js");
const { verifyToken } = require("../Middleware/verifyCompany.js")
const upload = require('../Middleware/multer')

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout)
router.post('/verify-password', verifyPassword);


//Queries
router.get('/companies/filter', getCompaniesByCategory);
router.get('/companies/search', searchCompanies);



// CRUD routes
router.get("/companies", getAllCompanies);
router.get('/companies/:companyId', verifyToken, getCompanyById);
router.put('/companies/:companyId', verifyToken, upload.single('logo'), updateCompany);
router.delete('/companies/:companyId', verifyToken, deleteCompany);



module.exports = router;