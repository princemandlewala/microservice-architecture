const redis = require('redis');
const client = redis.createClient();
var error = [];

client.on('connect', function(){
    console.log('Redis client connected');
});

client.on('error', function(err){
    console.log("some problem with redis "+ err);
});

module.exports = client;