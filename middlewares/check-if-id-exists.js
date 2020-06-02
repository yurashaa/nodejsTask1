const {productService} = require('../services');
const ErrorHandler = require('../error/ErrorHandler');
const {errorsEnum: {ERR_NO_PRODUCT_ID}} = require('../constants');

module.exports = async (req, res, next) => {
    try{
        const { productId } = req.params;

        const product = await productService.getProductById(productId);

        if(!product){
            return next(new ErrorHandler(ERR_NO_PRODUCT_ID), 404, 4041);
        }

        req.product = product;

        next();
    } catch (e) {
        next(new ErrorHandler(e.message));
    }
};
