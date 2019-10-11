const mongoose = require('mongoose');

const next_evolution_schema = mongoose.Schema({
    num: {
        type : String 
    },
    name: {
        type : String 
    }
})

const PokemonSchema = mongoose.Schema({
        id : {
            type : Number
        },
        num: {
            type : String,
            required : true 
        },
        name: {
            type : String,
            required : true 
        },
        img: {
            type : String,
            required : true 
        },
        type: {
            type : [String],
            required : true 
        },
        height: {
            type : String
        },
        weight: {
            type : String
        },
        candy: {
            type : String
        },
        candy_count: {
            type : Number
        },
        egg: {
            type : String
        },
        spawn_chance: {
            type : Number
        },
        avg_spawns: {
            type : Number
        },
        spawn_time: {
            type : String,
        },
        multipliers: {
            type : [Number],
        },
        weaknesses: {
            type : [String],
            required : true 
        },
        next_evolution: {
            type : [next_evolution_schema],
            default : []
        },
        status : {
            type : String,
            default : 'active'
        },
        lastUpdated : {
            type : Date,
            default : Date.now
        }
});



module.exports = mongoose.model('Pokemon', PokemonSchema);
