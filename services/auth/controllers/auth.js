const express = require('express');
const router = express.Router();
const user_model = require('../models/user')
const jwt = require('jsonwebtoken');
var config = require('../config')


router.post('/register',function(req,res){
    var data = req.body;
    var error = [];
    var message = [];
    var new_user = new user_model({ user_name: data.user_name.toLowerCase(), first_name: data.first_name.toLowerCase(), last_name: data.last_name.toLowerCase(), email: data.email.toLowerCase(),phone_number: data.phone_number, password: data.password});
    console.log(new_user);
    new_user.save(function(err,	user){
        if(err){
            console.log(err);
            if(err.name==="MongoError" || err.code==11000){
                message.push("username or email provided has been used with other account")
                error.push(err.message);
                return res.status(400).json({status:400,message:message,data:null,error:error})
            }
            if(err) {
                for(var errName in err.errors){
                    if(errName==="user_name"){
                        if(err.errors[errName].kind==="required"){
                            message.push("user_name field is required");
                            var errJson = {"user_name":err.errors[errName].message};
                            error.push(errJson);
                        }
                    }
                    else if(errName==="first_name"){
                        if(err.errors[errName].kind==="required"){
                            message.push("first_name field is required");
                            var errJson = {"first_name":err.errors[errName].message};
                            error.push(errJson);
                        }   
                    }
                    else if(errName==="last_name"){
                        if(err.errors[errName].kind==="required"){
                            message.push("last_name field is required");
                            var errJson = {"last_name":err.errors[errName].message};
                            error.push(errJson);
                        }
                    }
                    else if(errName==="email"){
                        if(err.errors[errName].kind==="user defined"){
                            message.push("Invalid email id");
                            var errJson = {"email":err.errors[errName].message};
                            error.push(errJson);
                        }
                        else if(err.errors[errName].kind==="required"){
                            message.push("email field is required");
                            var errJson = {"email":err.errors[errName].message};
                            error.push(errJson);
                        }
                    }
                    else if(errName==="phone_number"){
                        if(err.errors[errName].kind==="user defined"){
                            message.push("Invalid phone number");
                            var errJson = {"phone_number":err.errors[errName].message};
                            error.push(errJson);
                        }
                        else if(err.errors[errName].kind==="required"){
                            message.push("phone_number field is required");
                            var errJson = {"phone_number":err.errors[errName].message};
                            error.push(errJson);
                        }
                    }
                    else if(errName==="password"){
                        if(err.errors[errName].kind==="required"){
                            message.push("password field is required");
                            var errJson = {"password":err.errors[errName].message};
                            error.push(errJson);
                        }
                    }
                }
                return res.status(400).json({status:400,message:message,data:null,error:error})
            }
        }
        error.push("None");
        var link = "/user/profile/"+user.user_name;
        res.status(201).json({status:201,message:"OK",data:link,type:"success",error:error});
    });
});

router.post('/authenticate',function(req,res){
    var error = [];
    if(!req.body.username || req.body.password){
        error.push("Username or password is missing or both are missing")
        res.status(400).json({status:400,message:"Username and password both are required for authentication",error:error});
    }
    var user_name = req.body.user_name.toLowerCase();
    user_model.findOne({'user_name':user_name}, function(err,user){
        if(err){
            error.push(err.message);
            res.status(500).json({status:500,message:"internal error",error:error});
        }
    })
});


module.exports = router;
