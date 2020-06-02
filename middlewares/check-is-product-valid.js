const Joi = require('joi');

const ErrorHandler = require('../error/ErrorHandler');
const {productValidatorSchema} = require('../validators');

module.exports = (req, res, next) => {
        const {error} = Joi.validate(req.body, productValidatorSchema);

        if(error) {
            return next(new ErrorHandler(error.details[0].message, 400, 4001));
        }

        next();
};

