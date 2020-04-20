const router = require('express').Router();
const User = require('../model/User');
const {validateLogin, validateRegister} = require('../validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
	let headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	res.set(headers);
	//Validate input
	const error = validateRegister(req.body)
	if(error)
		return res.status(400).send(error.details[0].message);
		
	//Check  if user exists
	const userExists = await User.findOne({email: req.body.email});
	if(userExists) 
		return res.status(400).send("User exists");

	//Hash password 
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);
	
	//Add user to db
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword
	});

	try {
		const savedUser = await user.save();
		res.send( { user: user._id } );	
	} catch(err) {
		res.status(400).send(err);
	}
});

router.post('/login', async (req, res) => {
	let headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	res.set(headers);

	//Validate input
	const error = validateLogin(req.body)
	if(error)
		return res.status(400).send(error.details[0].message);
		
	//Validate user
	const userExists = await User.findOne({email: req.body.email});
	if(!userExists) 
		return res.status(400).send("User does not exist");

	const validPass = await bcrypt.compare(req.body.password, userExists.password);
	if(!validPass)
		return res.status(400).send("Invalid passowrd");
 
	//Create and assign a token 
	const token = jwt.sign( { _id: userExists._id }, process.env.MY_SECRET );
	res.header('auth-token', token).send(token);	
});

module.exports = router;