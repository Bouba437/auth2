const joi = require("joi");

function userValidation (body) {
    const userValidationSchema = joi.object({
        firstName: joi.string().min(2).max(30).trim().required(),
        lastName: joi.string().min(2).max(30).trim().required(),
        email: joi.string().email().trim().required(),
        password: joi.string().min(5).max(30).required()
    })

    return userValidationSchema.validate(body);
}

module.exports = userValidation