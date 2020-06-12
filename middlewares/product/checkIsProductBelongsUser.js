const {ErrorHandler, errorsEnum} = require('../../error');
const {responseStatusCode} = require('../../constants');

module.exports = async (req, res, next) => {
    try{
        const productUserId = req.product.user_id;
        const userId = req.user_id;

        if(productUserId !== userId){
            return next(new ErrorHandler(
                errorsEnum.ERR_NOT_VALID_PRODUCT.msg,
                responseStatusCode.BAD_REQUEST,
                errorsEnum.ERR_NOT_VALID_PRODUCT.code
            ));
        }

        next();
    } catch (e) {
        next(new ErrorHandler(e));
    }
};
