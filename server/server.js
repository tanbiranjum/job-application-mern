const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require("cookie-parser");
const employeeRoute = require('./Routes/employeeRoute')
const morgan = require('morgan');
const connectDB = require('./DB/connectDB');
const companyRoutes = require('./Routes/Company.Routes.js')
const jobRoutes = require('./Routes/jobRoutes.js')
const path = require('path');

//configure env
dotenv.config()

//configuring database
connectDB()

const app = express();

//middleware
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions))

app.use("/api/company", companyRoutes);

app.use("/api/jobs", jobRoutes)

app.get('/', (req, res) => {
  res.send('Your api is live ')
})


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


//routes
app.use('/', employeeRoute)


//run server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log("server is connected"))