const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ms_users',{useNewUrlParser:true},function(err){
    if(err){
        return false;
    }
    else{
        return true;
    }
});

module.exports = mongoose;