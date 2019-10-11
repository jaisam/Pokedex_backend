// Importing modules using require keyword
const express = require('express');


// Using Express's Router (Very Important)
/* 
    if this is not done, express will not be able find API for /name route.
*/
const router = express.Router();


// Exporting router (Very Important)
/*
    If this is not done, you will not be able to Import this in other files
*/
module.exports = router;


// API's

// Getting Pokemons by using type Parameter sent in request
router.get('/:inputType' , (req,res) => {
    try {
        res.send(req.params.inputType);

    } catch(error) {
        res.status(400).json({ msg : error.msg });
    }
})