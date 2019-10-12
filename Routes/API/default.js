// Importing modules using require keyword
const express = require('express');


// Using Express's Router (Very Important)
/* 
    if this is not done, express will not be able find API for /name route.
*/
const router = express.Router();
const Pokemon = require('../../Models/Pokemon');

// Exporting router (Very Important)
/*
    If this is not done, you will not be able to Import this in other files
*/
module.exports = router;


// API's

// Getting all Pokemons 
/*
Below function will get all Pokemons if route is any of below :
localhost:3000/name
localhost:3000/type
localhost:3000/weakness
*/
router.get('/:type(name|type|weakness)/', async (req,res) => {
    try {
        //res.send('We are on default route');
        const allPokemons = await Pokemon.find().sort({ id : 1 });
        res.json(allPokemons);
        console.log(allPokemons)

    } catch(error) {
        res.status(400).json({ msg : error.msg });
    }
});