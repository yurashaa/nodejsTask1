const Joi = require('joi');

module.exports = Joi.object().keys({
    name: Joi.string().trim().alphanum().min(2).max(30).required(),
    price: Joi.number().integer().min(1).required(),
    discount: Joi.number().integer().optional().allow(null),
    codeWord: Joi.string().trim().min(1).max(10).required()
});
