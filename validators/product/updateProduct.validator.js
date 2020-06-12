const Joi = require('joi');

module.exports = Joi.object().keys({
    price: Joi.number().integer().min(1).optional(),
});
