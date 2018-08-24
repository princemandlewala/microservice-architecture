const express = require('express');
const router = express.Router();
var note_model = require('../models/note');
const dbConnection = require('../database/connection');

router.get('/getAll/:user_name',function(req,res){
    var user_name = req.params.user_name.toLowerCase();
    var error = [];
    if(!req.body.auth_token && !req.params.auth_token && !req.headers['auth_token']){
        error.push("malformed request");
        return res.status(400).json({status:400,message:"missing authorization token in request",data:null,error:error});
    }
    note_model.find({user_name:user_name},function(err,notes){
        if(err){
            error.push("Internal error");
            return res.status(500).json({status:500,message:"internal error",data:null,error:error})
        }
        if(notes.length==0){
            error.push("No notes found for "+user_name);
            return res.status(404).json({status:404,message:"No data found",data:null,error:error});
        }
        error.push("None");
        return res.status(200).json({status:200, message:"Ok", data:notes,error:error});
    })
});

router.post('/create/:user_name',function(req,res){
    var data = req.body;
    var user_name = req.params.user_name.toLowerCase();
    var error = [];
    var message = [];
    var new_note = new note_model(data);
    new_note.user_name = user_name;
    if(!data.content){
        new_note.content = "# (default value by system)";
    }
    else{
        new_note.content = data.content;
    }
    if(data.priority){
        new_note.priority = data.priority.toLowerCase();
    }
    new_note.save(function(err,	note){
        if(err) {
            console.log(err);
            for(var errName in err.errors){
                if(errName==="priority"){
                    if(err.errors[errName].kind==="required"){
                        message.push("priority field is required");
                        var errJson = {"priority":err.errors[errName].message};
                        error.push(errJson);
                    }
                    if(err.errors[errName].kind==="enum"){
                        message.push("Allowed values for priority field: low, medium, high")
                        var errJson = {"priority":err.errors[errName].message};
                        error.push(errJson);
                    }
                }
                else if(errName==="tag"){
                    if(err.errors[errName].kind==="user defined"){
                        message.push("tag field should follow '#[a-zA-Z]' regex");
                        var errJson = {"tag":err.errors[errName].message};
                        error.push(errJson);
                    }
                }
            }
            return res.status(400).json({status:400,message:message,data:null,error:error})
        }
        error.push("None");
        var link = "/api/v1/notes"+req.url+"/"+note._id;
        res.status(201).json({status:201,message:"OK",data:link,error:error});
    });
});

router.post('/update/:user_name/:note_id',function(req,res){
    var user_name = req.params.user_name.toLowerCase();
    var note_id = req.params.note_id;
    var error = [];
    var message = [];
    var data = req.body;
    note_model.findOneAndUpdate({_id: note_id, user_name: user_name},data, {new: true, runValidators: true},function(err,note){
        if(err){
            console.log(err);
            error.push(err.name);
            message.push("internal error");
            res.status(500).json({status:500, message:message,data:null,error:error});
        }
        error.push("None");
        console.log(note);
        res.status(200).json({status:200,message:"OK",data:note,error:error});
    })
});

router.post('/delete/:user_name/:note_id',function(req,res){
    var user_name = req.params.user_name.toLowerCase();
    var note_id = req.params.note_id;
    var error = [];
    var message = [];
    note_model.findOneAndRemove({_id: note_id, user_name: user_name},function(err,note){
        if(err){
            console.log(err);
            error.push(err.name);
            message.push("internal error");
            res.status(500).json({status:500, message:message,data:null,error:error});
        }
        error.push("None");
        console.log(note);
        res.status(200).json({status:200,message:"note deleted",error:error});
    })
});
module.exports = router;