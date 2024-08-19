const express = require('express');
const { register, login, getAllCompanies, getCompanyById, updateCompany, deleteCompany } = require("../Controller/Company.Controller.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/companies", getAllCompanies);
router.get('/companies/:companyId', getCompanyById);
router.put('/companies/:companyId', updateCompany);
router.delete('/companies/:companyId', deleteCompany);





module.exports = router;