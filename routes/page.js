const router = require('express').Router();
const verify = require('../model/verifyToken');

router.get('/page', verify, (req, res) => {
	res.json({
		page: {
			title: "page title", 
			text: "page text"
		}
	});
	
});

module.exports = router