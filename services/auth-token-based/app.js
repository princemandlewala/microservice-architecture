const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dbConnection = require('./database/connection');
const redis = require('./database/redis');
//const user = require('./models/user');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(require('./controllers'));
app.use(morgan('dev'));
if(dbConnection){
	console.log("Connected to mongodb");
}
else{
	console.log("Not Connected to MongoDb");
}
app.listen(8000,function(){
	console.log('Server is listening at port 8000');
});

if(redis){
	console.log("connected to redis");
}
else{
	console.log("Not connected to redis");
}
