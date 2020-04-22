const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

//Connect to db
mongoose.connect (
	process.env.DB_CONNECT, 
	{ useNewUrlParser: true}, 
	() => {
		console.log("Connected to db");
	}
);

//Routes
const authRoute = require('./routes/auth');
const pageRoute = require('./routes/page');
const dbRoute = require('./routes/db');

//Middleware
app.use(cors());
app.use(express.json());

//Routes middlewares 
app.use('/api/user', authRoute);
app.use('/api/db', dbRoute);

app.listen(80, () => { console.log("Hello, server")} );