const Joi = require('joi');

const {
    ErrorHandler,
    errorsEnum: {ERR_NOT_VALID_LOGIN_DATA}
} = require('../../error');
const {authValidatorsSchema: {loginDataValidity}} = require('../../validators');
const {responseStatusCode: {BAD_REQUEST}} = require('../../constants');

module.exports = (req, res, next) => {
    const {error} = Joi.validate(req.body, loginDataValidity);

    if(error) {
        return next(new ErrorHandler(
            error.details[0].message,
            BAD_REQUEST,
            ERR_NOT_VALID_LOGIN_DATA.code
        ));
    }

    next();
};
