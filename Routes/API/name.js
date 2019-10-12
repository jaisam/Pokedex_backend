/***********************        Importing modules using require keyword     ***********************/
const express = require('express');
const Pokemon = require('../../Models/Pokemon');


/***********************        Using Express's Router (Very Important)     ***********************/
//if this is not done, express will not be able find API for /name route.
const router = express.Router();

/***********************        Exporting router (Very Important)       *************************/
//If this is not done, you will not be able to Import this in other files
module.exports = router;

/***********************        API's       ******************************/

// [start] API Function to get Specifc Pokemon data by using name Parameter sent in request
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
// [end] API Function to get Specifc Pokemon data by using name Parameter sent in request


// [start] API function created just to put pokemonData into Database through Postman 
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
// [end] API function created just to put pokemonData into Database through Postman 



// [start] API function to Update all properties of Pokemon data by using num parameter sent in by User
router.put('/:num' , async (req,res) => {

    //console.log( req.params.num );
    const inputNum = req.params.num.toString();
    let update = {};

    try {
    const oldPokemon = await Pokemon.find({ id : inputNum });

    // Finding property: value in req.body
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    // creating dynamic update object which will have list of properties user want to update
    for (let i=0 ; i< keys.length ; i++) {
        update[keys[i]] = values[i];
    }

    // creating dynamic update query by using update object created above
    const updData = await Pokemon.updateOne(
                    { num : inputNum } , 
                    { $set : update
                });
        
    // if data updated successfully, then send response or error messages 
    if ( updData.n !=0 ) {
        res.json( updData );
    }
    else {
        res.json({ msg : `Cannot update as Pokemon with ${inputNum} number does not exist`});
    }
 
    } catch (error) {
        res.status(400).json({ msg : error.msg });
    }
});
// [end] API function to Update all properties of Pokemon data by using num parameter sent in by User


// [start] API function to update single property of Pokemon
router.patch('/:num', async (req,res) => {

    console.log(req.params.num.toString());
    const inputNum = req.params.num.toString();
    let update = {};

    try {
    const oldPokemon = await Pokemon.find({ num : inputNum });

    // Finding property: value in req.body
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    
    // creating dynamic update object which will have list of properties user want to update
    for (let i=0 ; i< keys.length ; i++ )
    {
        update[keys[i]] = values[i] ;
    }
    console.log(update);
    
    // creating dynamic update query by using update object created above
    const updData = await Pokemon.updateOne(
            { num : inputNum },
            { $set : update
        });

    // if data updated successfully, then send response or error messages 
    if (updData.n != 0) {
        res.json(updData);
    } else {
        res.json({ msg : `Cannot update as Pokemon with ${inputNum} num not found`});
    }

    } catch(error) {
      res.status(400).json({ msg : error.msg });  
    }
});
// [end] API function to update single property of Pokemon


// [start] API function to Delete Pokemon by using num sent by User
router.delete('/:num', async (req,res) => {
    
    console.log(req.params.num);
    const inputNum = req.params.num.toString();

    try{
        const delData = await Pokemon.deleteOne({ num : inputNum });
        if (delData.n != 0 ) {
            res.json(delData);
        } else {
            res.json({ msg : `Cannot delete as Pokemon with ${inputNum} num not found `});
        }
    } catch (error) {
        res.status(400).json({ msg : error.msg });
    }
});
// [end] API function to Delete Pokemon by using num sent by User


