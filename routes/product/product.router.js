const {Router} = require('express');

const {productController} = require('../../controllers');
const {
    productMiddlewares: {dataValidity, isProductIdExists, updateValidity, isProductBelongsUser},
    authMiddlewares: {checkAccessToken},
    fileMiddlewares: {checkFiles, checkFilesCount, isProductPhotoExists}
} = require('../../middlewares');

const productRouter = Router();

productRouter.get('/', productController.getProducts);

productRouter.get('/:productId',isProductIdExists, productController.getProductById);

productRouter.post('/',
    dataValidity,
    checkAccessToken,
    checkFiles,
    checkFilesCount,
    productController.createProduct);

productRouter.delete('/:productId/delete-photo',
    checkAccessToken,
    isProductIdExists,
    isProductBelongsUser,
    isProductPhotoExists,
    productController.deletePhoto);

productRouter.delete('/:productId', checkAccessToken, isProductIdExists, productController.deleteProduct);

productRouter.put('/:productId',
    updateValidity,
    checkAccessToken,
    isProductIdExists,
    isProductBelongsUser,
    checkFiles,
    checkFilesCount,
    productController.updateProduct);

module.exports = productRouter;
