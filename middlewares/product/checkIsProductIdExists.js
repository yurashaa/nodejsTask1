const {productService} = require('../../services');
const {ErrorHandler, errorsEnum} = require('../../error');
const {responseStatusCode} = require('../../constants');

module.exports = async (req, res, next) => {
    try{
        const { productId } = req.params;

        const product = await productService.getProductById(productId);

        if(!product){
            return next(new ErrorHandler(
                errorsEnum.ERR_NO_PRODUCT_ID.msg,
                responseStatusCode.NOT_FOUND,
                errorsEnum.ERR_NO_PRODUCT_ID.code
            ));
        }

        req.product = product;

        next();
    } catch (e) {
        next(new ErrorHandler(e));
    }
};
