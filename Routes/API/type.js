// Importing modules using require keyword
const express = require('express');
const Pokemon = require('../../Models/Pokemon');

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
router.get('/:inputType' , async (req,res) => {
    try {
        //console.log(`^${req.params.inputType}`);
        const typeRegex = new RegExp(`^${req.params.inputType}`, 'i');
        const pokemons = await Pokemon.find({ type : typeRegex });

        // pokemons.forEach(pokemon => {
        //     console.log(pokemon);
        // });

        if (pokemons.length>0){
            res.json(pokemons);
        } 
        else {
            res.json({ msg : 'No such Type exists' });
        }

    } catch(error) {
        res.status(400).json({ msg : error.msg });
    }
})