// importing modules using require keyword
const express = require('express');
const mongoose = require('mongoose');
const Pokemon = require('./Models/Pokemon');

// Init Express app
const app = express();
mongoose.connect('mongodb://localhost/Pokemon', 
                { useNewUrlParser: true , useUnifiedTopology: true } , 
                () => console.log(`Connected to DB`));

const PORT = 3000;

// Listening to PORT
app.listen(PORT , () => console.log(`Server started on ${PORT}`));

// Importing ROUTES
const defaultRoute = require('./Routes/API/default');
const nameRoute = require('./Routes/API/name');
const typeRoute = require('./Routes/API/type');
const weaknessRoute = require('./Routes/API/weakness');


// Body Parser middleware. 
/*
    Bodyparser should be before ROUTES middleware else it wont parse req.body 
*/
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// ROUTES middleware
app.use('/' , defaultRoute);
app.use('/name' , nameRoute);
app.use('/type' , typeRoute);
app.use('/weakness' , weaknessRoute);