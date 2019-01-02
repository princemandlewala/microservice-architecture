const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const serviceUrl = require('./url');
app.listen(9000,function(){
    console.log("connected to API gateway on port 9000");
});

app.all("/api/v1/auth/*",function(req,res){
    console.log('redirecting to auth service');
    apiProxy.web(req,res,{target:serviceUrl.auth});
})

app.all("/api/v1/notes/*",function(req,res){
    console.log('redirecting to notes service');
    apiProxy.web(req,res,{target:serviceUrl.notes});
})

