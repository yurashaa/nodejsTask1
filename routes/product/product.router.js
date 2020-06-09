const {Router} = require('express');

const {productController} = require('../../controllers');
const {
    productMiddlewares: {dataValidity, isIdExists, updateValidity},
    authMiddlewares: {checkAccessToken},
} = require('../../middlewares');

const productRouter = Router();

productRouter.get('/', productController.getProducts);

productRouter.get('/:productId',isIdExists, productController.getProductById);

productRouter.post('/', dataValidity, checkAccessToken, productController.createProduct);

productRouter.delete('/:productId', checkAccessToken, isIdExists, productController.deleteProduct);

productRouter.put('/:productId', updateValidity, checkAccessToken, isIdExists, productController.updateProduct);

module.exports = productRouter;
