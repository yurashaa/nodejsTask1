const {Router} = require('express');

const {productController} = require('../../controllers');
const { productMiddlewares: {dataValidity, isIdExists} } = require('../../middlewares');

const productRouter = Router();

productRouter.get('/', productController.getProducts);

productRouter.get('/:productId',isIdExists, productController.getProductById);

productRouter.post('/', dataValidity, productController.createProduct);

productRouter.delete('/:productId', isIdExists, productController.deleteProduct);

productRouter.put('/:productId', dataValidity, isIdExists, productController.updateProduct);

module.exports = productRouter;
