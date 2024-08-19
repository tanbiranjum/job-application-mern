const express = require('express');
const { register, login, google ,logout, getAllCompanies, getCompanyById, updateCompany, deleteCompany } = require("../Controller/Company.Controller.js");

const router = express.Router();

router.post("/register", register);
router.post("/register/google", google);
router.post("/login", login);
router.post("/login/google", google);
router.get("/logout", logout);
router.get("/companies", getAllCompanies);
router.get('/companies/:companyId', getCompanyById);
router.put('/companies/:companyId', updateCompany);
router.delete('/companies/:companyId', deleteCompany);





module.exports = router;