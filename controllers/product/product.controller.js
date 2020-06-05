const {productService} = require('../../services');
const {hash} = require('../../helpers');
const {ErrorHandler} = require('../../error');

module.exports = {
    getProducts: async (req, res, next) => {
        try {
            const products = await productService.getAllProducts();

            res.json(products);
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    },

    getProductById: async (req, res) => {
            res.json(req.product);
    },

    createProduct: async (req, res, next) => {
        try {
            req.body.codeWord = await hash(req.body.codeWord);

            await productService.createNewProduct(req.body);
            res.redirect('/products');
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            const {productId} = req.params;

            await productService.deleteProductById(+productId);
            res.sendStatus(204);
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const {productId} = req.params;

            await productService.updateProduct(productId, req.body);
            res.sendStatus(204);
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    }
};
