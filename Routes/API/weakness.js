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

// Getting Pokemons by using weakness Parameter sent in request
router.get('/:inputWeakness' , async (req,res) => {
    try {
        console.log(`^${req.params.inputWeakness}`);
        const weaknessRegx = new RegExp(`^${req.params.inputWeakness}`, 'i');
        const pokemons = await Pokemon.find({ weaknesses : weaknessRegx });

        pokemons.forEach(pokemon => {
            console.log(pokemon);
        })

        if(pokemons.length>0) {
            res.json(pokemons);
        }
        else {
            res.json({ msg : 'No such weaknes exist' });
        }
    } catch(error) {
        res.status(400).json({ msg: error.msg });
    }
});
