const express = require('express');
const router = express.Router()
const { register, login, update, deleteEmp,getAllEmployee,getEmployeeById } = require('../Controller/employeeController');
const upload=require('../Middleware/multer')





//routing
router.post('/register', register)
router.post('/login', login)
router.put('/update/:id',upload.single('Photo'), update)
router.delete('/delete/:id', deleteEmp)
router.get('/getAllEmployee', getAllEmployee)
router.get('/getEmployeeById/:id', getEmployeeById)


// Test route for file upload
router.post('/upload-test', upload.single('photo'), (req, res) => {
  res.send('File uploaded successfully');
});






module.exports = router