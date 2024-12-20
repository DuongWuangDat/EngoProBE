const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getUser = {
	params: Joi.object().keys({
		userId: Joi.string().custom(objectId).required(),
	}),
};

const updateUser = {
	params: Joi.object().keys({
		userId: Joi.string().custom(objectId).required(),
	}),
	body: Joi.object()
		.keys({
			email: Joi.string().email(),
			username: Joi.string().min(3).max(30),
			password: Joi.string().min(8).max(30),
			// avatar will be handled by multer
		})
};

module.exports = {
	getUser,
	updateUser,
};
