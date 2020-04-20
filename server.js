const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

function cs(arg) {
	console.log(arg);
}

dotenv.config();

//Connect to db
mongoose.connect (
	process.env.DB_CONNECT, 
	{ useNewUrlParser: true}, 
	() => {
		cs("Connected to db");
	}
);

//Routes
const authRoute = require('./routes/auth');
const pageRoute = require('./routes/page');


app.options('/api/user/register', (req, res) => {
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	res.writeHead(200, headers);
	res.end();
});

//Middleware
app.use(express.json());
//Routes middlewares 
app.use('/api/user', authRoute);
app.use('', pageRoute);

app.listen(80, () => { console.log("Hello, server")} );