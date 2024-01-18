const joi = require("joi");
const errorFunction = require("../../utils/errorFunction");

const validation = joi.object({
    name: joi.string(),
    username: joi.string().min(3).max(25).trim(true),
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(8).trim(true).required(),
});

const userValidation = async (req, res, next) => {
	const {name, username, email, password} = req.body;
	const payload = {
    name, username, email,	password,
	};

	const { error } = validation.validate(payload);
	if (error) {
		res.status(406);
		return res.json(
			errorFunction(true, `Error in User Data : ${error.message}`)
		);
	} else {
		next();
	}
};
module.exports = userValidation;