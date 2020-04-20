const jwt = require('jsonwebtoken');

function auth(req, res, next) {
	const token = req.header('auth-token');
	if(!token)
		return res.status(400).send('Access Denied');

	try {
		const verified = jwt.verify(token, process.env.MY_SECRET);
		req.user = verified;
		next();
	} catch(err) {
		res.status(400).send('Invalid token');
	}
}	

module.exports = auth;
