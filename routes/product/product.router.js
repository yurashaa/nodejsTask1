const {Router} = require('express');

const {productController} = require('../../controllers');
const { dataValidity,
        isIdExists } = require('../../middlewares');

const productRouter = Router();

productRouter.get('/', productController.getProducts);

productRouter.get('/:id',isIdExists, productController.getProductById);

productRouter.post('/', dataValidity, productController.createProduct);

productRouter.delete('/:id', isIdExists, productController.deleteProduct);

productRouter.put('/:id', dataValidity, isIdExists, productController.updateProduct);

module.exports = productRouter;
