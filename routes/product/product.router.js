const {Router} = require('express');

const {productController} = require('../../controllers');
const { isAvailable,
        dataValidity,
        isIdExists,
        isIdToUpdateExists} = require('../../middlewares');

const productRouter = Router();

productRouter.get('/', productController.getProducts);

productRouter.get('/:id',isIdExists, productController.getProductById);

productRouter.post('/', dataValidity, isAvailable, productController.createProduct);

productRouter.delete('/:id', isIdExists, productController.deleteProduct);

productRouter.put('/', dataValidity, isIdToUpdateExists, productController.updateProduct);

module.exports = productRouter;
