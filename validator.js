//Validation 
const Joi = require('@hapi/joi');


function validateRegister(data) {
	const schema = Joi.object({
		name: Joi.string().min(2).required(),
		email: Joi.string().min(6).email().required(),
		password: Joi.string().min(6).required()
	});
	return schema.validate(data).error;
}

function validateLogin(data) {
	const schema = Joi.object({
		email: Joi.string().min(6).email().required(),
		password: Joi.string().min(6).required()
	});
	return schema.validate(data).error;
}

module.exports = {validateLogin, validateRegister};