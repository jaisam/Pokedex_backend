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

// Getting Specifc Pokemon by using name Parameter sent in request
router.get('/:inputName', async (req,res) => {
    try {
        // creating regex pattern by adding inputName parameter
        const nameRegex = new RegExp(`^${req.params.inputName}`, 'i');

        //finding pokemon using regExp
        const pokemons = await Pokemon.find({ name : nameRegex }); 

        if(pokemons.length>0) {
            res.json(pokemons);
        } else {
            res.json({ msg : 'Pokemon does not exist with such name '});
        }
    } catch(error) {
        res.status(400).json({ msg: error });
    }
});

// This method is created just to put pokemonData into Database through Postman 
router.post('/',  (req,res) => {

/*  This method throws error, member.save is not a function

    let pokemonsData = new Pokemon([{}]);
    pokemonsData = req.body.data;
    try {
        pokemonsData.forEach( async (member) => {
            // console.log(member);
             const savedData = await member.save();
             console.log(savedData);
        });
    } catch (error) {
        res.status(400).json({ msg : error.msg });
    }
*/

/*      This method works       */
    try {
        req.body.data.forEach( async (member) => {
            //console.log(member);
            let pokemonsData = new Pokemon(member);
             //console.log(pokemonsData);
             const savedData = await pokemonsData.save();
             res.json({ savedData });
        });
    } catch (error) {
        res.status(400).json({ msg : error.msg });
    } 
});