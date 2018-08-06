var express = require('express');
var router = express.Router();

router.use('/api/auth',require('./register'));

router.use('/*',function(req,res){
    res.status(404).json({status:404,message:"The requested resource could not be found",error:"NOT FOUND"});
});

module.exports = router;