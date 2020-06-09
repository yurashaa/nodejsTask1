const Joi = require('joi');

const {ErrorHandler, errorsEnum} = require('../../error');
const {productValidatorsSchema: {updateProductValidator}} = require('../../validators');
const {responseStatusCode} = require('../../constants');


module.exports = (req, res, next) => {
        const {error} = Joi.validate(req.body, updateProductValidator);

        if(error) {
            return next(new ErrorHandler(
                error.details[0].message,
                responseStatusCode.BAD_REQUEST,
                errorsEnum.ERR_NOT_VALID_PRODUCT.code
            ));
        }

        next();
};

