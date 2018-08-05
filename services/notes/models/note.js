const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var note = new Schema({
    user_name:{
        type: String,
        required: true
    },
    content:{
        type: String    
    },
    priority:{
        type: String,
        default: "medium",
        required: true,
        enum:['low','medium','high']
    },
    tag: {
        type: String,
        validate: /#[a-z]/
    }
});

var note_model = mongoose.model('note',note);

module.exports = note_model;