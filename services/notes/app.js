const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./database/connection');
const morgan = require('morgan');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(require('./controllers'));
app.use(morgan('dev'));

if(dbConnection){
	console.log("Connected to db");
}
else{
	console.log("Not connected to db");
}

app.listen(8001,function(){
	console.log('Server is listening at port 8001');
});
