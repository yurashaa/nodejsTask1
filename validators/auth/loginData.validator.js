const Joi = require('joi');

const {regexEnum: {EMAIL_REGEX}} = require('../../constants');

module.exports = Joi.object().keys({
    email: Joi.string().trim().regex(EMAIL_REGEX).required(),
    password: Joi.string().min(8).required(),
});
