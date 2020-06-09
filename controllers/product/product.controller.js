const {actionsEnum: {PRODUCT_ADD, PRODUCT_UPDATE, PRODUCT_DELETE}} = require('../../constants');
const {ErrorHandler} = require('../../error');
const {hash} = require('../../helpers');
const {emailService, productService, userService} = require('../../services');

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

            const user = await userService.getUserById(req.user_id);

            await productService.createNewProduct(req.body);
            emailService.sendEmail(user.email, PRODUCT_ADD, {...req.body, userName: user.name})
                .catch(() => {});

            res.redirect('/products');
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            const {productId} = req.params;
            const {name} = req.product;

            const user = await userService.getUserById(req.user_id);

            await productService.deleteProductById(+productId);
            await emailService.sendEmail(user.email, PRODUCT_DELETE, {name, userName: user.name})
                .catch(() => {});

            res.sendStatus(204);
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const {productId} = req.params;
            const {name} = req.product;

            const user = await userService.getUserById(req.user_id);

            await productService.updateProduct(productId, req.body);
            emailService.sendEmail(user.email, PRODUCT_UPDATE, {...req.body, name, userName: user.name})
                .catch(() => {});

            res.sendStatus(204);
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    }
};
