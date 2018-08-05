const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const config = require('../config');
const path = require('path');

var user_model = require('../models/user')

router.post('/',function(req,res){
    var user_name = req.body.user_name.toLowerCase();
    var password = req.body.password;
    var error = [];
    user_model.findOne({'user_name':user_name,'password':password}, function(err,user){
        if(err){
            error.push("Internal error");
            return res.status(500).json({status:500,message:"internal error",auth:false,data:null,error:error});
        }
        if(!user){
            error.push("Authentication error. No user found");
            return res.status(404).json({status:404,message:"No data found",auth:false,data:null,error:error});
        }
        var token = jwt.sign({id: user._id},config.secret,{
            expiresIn: 86400
        });
        error.push("None");
        return res.status(200).json({status:200,message:"Send the token in your other api requests",auth:true,error:error,token:token});
    });
});

module.exports = router;
