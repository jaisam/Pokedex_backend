// importing modules using require keyword
const express = require('express');
const mongoose = require('mongoose');
const Pokemon = require('./Models/Pokemon');
const cors = require('cors');
require('dotenv').config();

// Init Express app
const app = express();
mongoose.connect(process.env.database_url, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log(`Connected to DB`));

const db = mongoose.connection;
db.on('error', (error) => console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connnection successful'));



// Listening to PORT
app.listen(process.env.PORT || process.env.port, () => console.log(`Server started on ${process.env.port}`));

// Importing ROUTES
const defaultRoute = require('./Routes/API/default');
const nameRoute = require('./Routes/API/name');
const typeRoute = require('./Routes/API/type');
const weaknessRoute = require('./Routes/API/weakness');


// CORS middleware
app.use(cors());

// Body Parser middleware. 
/*
    Bodyparser should be before ROUTES middleware else it wont parse req.body 
*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// ROUTES middleware 
app.use('/', defaultRoute);
app.use('/name', nameRoute);
app.use('/type', typeRoute);
app.use('/weakness', weaknessRoute);