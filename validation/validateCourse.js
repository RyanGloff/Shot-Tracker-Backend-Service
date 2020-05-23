const Joi = require('@hapi/joi');
const schema = Joi.object({
    name: Joi.string()
        .required()
});

async function validate (body) {
    return await schema.validate(body);
}

module.exports = validate;