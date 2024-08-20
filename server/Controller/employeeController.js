const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const employee = require('../Model/Employee.Model')


//Registration
exports.register = async (req, res) => {
  try {
    const { E_Name, E_Email, Password, } = req.body
    if (!E_Name && !E_Email && !Password) {
      return res.send({ error: "All fields are required" })
    }

    //exsisting user find
    const exist = await employee.findOne({ E_Email })
    if (exist) {
      return res.status(200).send({ message: "Email taken already" })
    }

    //password check
    if (Password.length < 6) {
      return res.status(400).send({ message: "Password should be 6 character long" })
    }

    //password bcrypt
    const hashedPassword = await bcrypt.hash(Password, 10)

    //save registration
    const user = new employee({ E_Name, E_Email, Password: hashedPassword })
    await user.save()

    res.status(201).send({ message: "Account createdd successfully", user })


  } catch (error) {

  }
}


//Login
exports.login = async (req, res) => {
  try {
    const { E_Email, Password } = req.body
    if (!E_Email && !Password) {
      return res.json({ message: "email and password must be required" })
    }
    const user = await employee.findOne({ E_Email })
    if (!user) {
      return res.json({ error: "Please enter your valid email address" })
    }
    //password matching
    const match = await bcrypt.compare(Password, user.Password)
    if (!match) {
      return res.json({ message: "Password do not match" })
    }

    //token 
    const token = jwt.sign({ id: user._id, name: user.E_Name }, process.env.JWT_SECRET, { expiresIn: "7d" })
    res.status(200).send({
      message: "login successfull", user: {
        name: user.E_Name,
        _id: user._id,
        email: user.E_Email,


      }, token
    })

    console.log(user)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Error in login" })
  }

}
