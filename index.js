const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
const path = require('path');
const axios = require('axios');



require('dotenv/config');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Body Parser Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Import Routes
const studentsRoute = require('./routes/students');
app.use('/student', studentsRoute);

// Serving static folder
app.use(express.static(path.join(__dirname, 'public'))); 

//Set Pug
app.set('view engine', 'pug');

// Pug routes/request
app.get('/admin', async (req, res) => {
    const query = await axios.get('http://localhost:4400/student/');
    res.render('admin', { students: query.data });
  });

app.get('/home', async (req, res) => {
    const query = await axios.get('http://localhost:4400/student/');
    res.render('home', { students: query.data });
  });

app.get('/entry', async (req, res) => {
    const query = await axios.get('http://localhost:4400/student/');
    res.render('entry', { students: query.data });
  });

// Connect to DB
mongoose.connect( 
    process.env.DB_CONNECTION, 
    {  useNewUrlParser: true ,
       useUnifiedTopology: true, 
    },
    () => console.log('Connected to DB')
);

// How do we start listening to the server
app.listen(4400);