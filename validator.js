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

function validateDbSet(data) {
	const schema = Joi.object({
		todos: (data.field === 0 || data.field === null  || data.field !== 1) ? (Joi.array().required()):(Joi.array()),
		prevTasks: (data.field === 1 || data.field === null || data.field !== 0) ? (Joi.array().required()):(Joi.array()),
		field: Joi.number().allow(null)
	});

	return schema.validate(data).error;
}

module.exports = {validateLogin, validateRegister, validateDbSet};