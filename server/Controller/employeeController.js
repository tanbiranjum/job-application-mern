const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const employee = require('../Model/Employee.Model')
const path = require('path');



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
    const user = await employee.findOne({ E_Email: E_Email })
    if (!user) {
      return res.json({ error: "Please enter your valid email address" })
    }
    //password matching
    const match = await bcrypt.compareSync(Password, user.Password)
    if (!match) {
      return res.json({ message: "Password do not match" })
    }

    //token 
    const token = jwt.sign({ id: user._id, name: user.E_Name }, process.env.JWT_SECRET, { expiresIn: "7d" })
    const { Password: hashedPassword, ...rest } = user._doc;

    res.status(200).json({ ...rest, token })

    console.log(user)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Error in login" })
  }

}

//update
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Employee ID is required" });
    }

    const { E_Name, E_Email, Password, Gender, DOB, Address, Phone_number, Bio, Skills, Experience, Education } = req.body;

    // Prepare update data
    let updateData = { E_Name, E_Email, Gender, DOB, Address, Phone_number, Bio, Skills, Experience, Education };

    // Handle password separately
    if (Password) {
      if (Password.length < 6) {
        return res.status(400).send({ message: "Password should be at least 6 characters long" });
      }
      const hashedPassword = await bcrypt.hash(Password, 10);
      updateData.Password = hashedPassword; // Include hashed password in updateData
    }

    // Handle file uploads
    if (req.files) {
      if (req.files.Photo) {
        const photoPath = path.join('public/photos', req.files.Photo[0].filename);
        updateData.Photo = photoPath; // Add photo path to update data
      }

      if (req.files.Cv) {
        const cvPath = path.join('public/cvs', req.files.Cv[0].filename);
        updateData.Cv = cvPath; // Add CV path to update data
      }
    }

    // Update employee data in the database
    const updatedEmployee = await employee.findByIdAndUpdate(id, updateData, { new: true });

    // Send the updated employee data as the response
    res.status(200).json(updatedEmployee);

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error updating employee" });
  }
};

// Delete
exports.deleteEmp = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "Employee ID is required" });
    }


    const deletedEmployee = await employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).send({ message: "Employee not found" });
    }

    res.status(200).send({ message: "Employee deleted successfully", employee: deletedEmployee });

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error deleting employee" });
  }
};


// Get All Employees
exports.getAllEmployee = async (req, res) => {
  try {

    const employees = await employee.find();


    if (employees.length === 0) {
      return res.status(404).send({ message: "No employees found" });
    }


    res.status(200).send({ employees });

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error retrieving employees" });
  }
};


// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const EmployeeDoc = await employee.findById(req.params.id);

    if (!EmployeeDoc) {
      return res.status(404).send({ message: "Employee not found" });
    }

    // Construct the full URL to the photo
    if (EmployeeDoc.Photo) {
      EmployeeDoc.Photo = `http://localhost:5500/public/photos/${path.basename(EmployeeDoc.Photo)}`;
    }

    // Construct the full URL to the CV
    if (EmployeeDoc.Cv) {
      EmployeeDoc.Cv = `http://localhost:5500/public/cvs/${path.basename(EmployeeDoc.Cv)}`;
    }

    res.json(EmployeeDoc);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving employee", error });
  }
};



exports.verifyPassword = async (req, res, next) => {
  const { id, Password } = req.body;

  // Validate request parameters
  if (!id || !Password) {
    return res.status(400).json({ message: "ID and password are required!" });
  }


  try {
    const Employee = await employee.findById(id);
    if (!Employee) return res.status(404).json({ message: "Company not found!" });

    const validPassword = await bcrypt.compareSync(Password, Employee.Password);
    if (!validPassword) return res.status(401).json({ message: "Invalid password!" });

    res.status(200).json({ message: "Password verified successfully!" });
  } catch (error) {
    next(error);
  }
};