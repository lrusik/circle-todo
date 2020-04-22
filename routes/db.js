const router = require('express').Router();
const verify = require('../model/verifyToken');
const User  = require('../model/User');
const {validateDbSet} = require('../validator');

router.get('/get', verify, async (req, res) => {
	const user = await User.findOne({'_id': req.user});

	res.json({
		todos: user.todos,
		prevTasks: user.prevTasks
	});
});

router.post('/set', verify, async (req, res) => {
	console.log("And here");
	const error = validateDbSet(req.body);
	if(error)
		return res.status(400).send(error.details[0].message);
	
	switch(req.body.field) {
		case 0:
			User.updateOne({_id: req.user}, {
			   todos: req.body.todos
			}, function(err, affected, resp) {
				if(err) return res.status(400).send(resp);
				return res.status(200).send(resp).end();
			})
			break;
		case 1:
			User.updateOne({_id: req.user}, {
				prevTasks: req.body.prevTasks
			}, function(err, affected, resp) {
				if(err) return res.status(400).send(resp);
				return res.status(200).send(resp).end();
			})
			break;
		default:
			User.updateOne({_id: req.user}, {
				todos: req.body.todos,
				prevTasks: req.body.prevTasks
			}, function(err, affected, resp) {
				if(err) return res.status(400).send(resp);
				return res.status(200).send(resp).end();
			})
			break;
	}
});

router.get('/getName', verify, async (req, res) => {
	const user = await User.findOne({'_id': req.user});

	res.json({
		name: user.name
	});
});

module.exports = router