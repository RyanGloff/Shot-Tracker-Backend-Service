const Joi = require('@hapi/joi');
const schema = Joi.object({
    number: Joi.number()
        .integer()
        .min(1)
        .max(18)
        .required(),
    par: Joi.number()
        .integer()
        .positive()
        .required(),
});

async function validate (body) {
    return await schema.validate(body);
}

module.exports = validate;