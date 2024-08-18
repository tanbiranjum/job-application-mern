const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');

const morgan = require('morgan');

const connectDB = require('./DB/connectDB');

const companyRoutes = require('./Routes/Company.Routes.js')

//configure env
dotenv.config()

//configuring database
connectDB()

const app = express();

//middleware
app.use(morgan('dev'))
app.use(express.json())

app.use(cors())

app.use("/api/company", companyRoutes);

app.get('/', (req, res) => {
  res.send('Your api is live ')
})


//run server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log("server is connected"))