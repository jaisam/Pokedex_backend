const mongoose = require('mongoose');

const PokemonSchema = mongoose.Schema({

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
            type : Array,
            "default" : []
        }

});

module.exports = mongoose.model('Pokemon', PokemonSchema);
