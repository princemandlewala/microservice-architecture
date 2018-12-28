const redis = require('redis');
const client = redis.createClient();
var error = [];

client.on('connect', function(){
    console.log('Redis client connected');
});

client.on('error', function(err){
    error.push("some problem with redis "+ err);
});

module.exports = client;