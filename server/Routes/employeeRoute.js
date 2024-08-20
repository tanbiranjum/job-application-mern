const express = require('express');

const {register,login} = require('../Controller/employeeController');


const router = express.Router()






//routing
router.post('/register', register)
router.post('/login', login)







module.exports = router