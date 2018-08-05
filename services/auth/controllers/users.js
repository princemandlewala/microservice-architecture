const express = require('express');
const router = express.Router();
var user_model = require('../models/user')


//service to see user's profile
router.get('/profile/:user_name',function(req,res){
    var user_name = req.params.user_name;
    console.log("username "+user_name);
    var error = [];
    user_model.findOne({'user_name':user_name},'user_name first_name last_name phone_number password email', function(err,user){
        if(err) {
            error.push("Internal server error");
            return res.status(500).json({status:500,message:"Internal error",data:null,type:"internal",error:error});
        }
        if(!user) {
            error.push("No profile data found error")
            return res.status(200).json({status:200,message:"No profile found",data:null,type:"No data found",error:error});
        }
        console.log(user.user_name+" "+user.first_name+" "+user.last_name);
        error.push("none")
        res.status(200).json({status:200,message:"OK",data:user,type:"found",error:error});
    });
});

//service to register user

module.exports = router;