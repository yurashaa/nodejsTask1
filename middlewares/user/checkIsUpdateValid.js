const Joi = require('joi');

const {userValidatorsSchema: {updateUserValidator}} = require('../../validators');
const {ErrorHandler, errorsEnum} = require('../../error');
const {responseStatusCode} = require('../../constants');

module.exports = (req, res , next) => {
    const {error} = Joi.validate(req.body, updateUserValidator);

    if(error) {
        return next(new ErrorHandler(
            error.details[0].message,
            responseStatusCode.BAD_REQUEST,
            errorsEnum.ERR_NOT_VALID_USER.code
        ));
    }

    next();
};
