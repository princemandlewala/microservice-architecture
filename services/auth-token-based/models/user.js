const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    user_name: {
        type: String,
        unique: true,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
        validate: /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        validate: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
});

var user_model = mongoose.model('User',user);    

module.exports = user_model;