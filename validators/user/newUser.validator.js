const Joi = require('joi');

const {regexEnum: {EMAIL_REGEX}} = require('../../constants');

module.exports = Joi.object().keys({
    email: Joi.string().trim().regex(EMAIL_REGEX).required(),
    name: Joi.string().trim().alphanum().min(2).max(30).required(),
    age: Joi.number().integer().min(1).required(),
    password: Joi.string().min(8).required(),
});
