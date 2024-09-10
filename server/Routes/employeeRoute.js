const express = require('express');
const router = express.Router()
const { register, login, update, deleteEmp,getAllEmployee,getEmployeeById,verifyPassword } = require('../Controller/employeeController');
const upload=require('../Middleware/multer')

const verifyEmployee=require("../Middleware/verifyEmployee")




//routing
router.post('/register', register)
router.post('/login', login)
router.put('/update/:id',upload.single('Photo'),verifyEmployee, update)
router.delete('/delete/:id', verifyEmployee,deleteEmp)
router.get('/getAllEmployee', getAllEmployee)
router.get('/getEmployeeById/:id',verifyEmployee, getEmployeeById)
router.post('/verify-password', verifyPassword);



// Test route for file upload
router.post('/upload-test', upload.single('photo'), (req, res) => {
  res.send('File uploaded successfully');
});






module.exports = router