const {
    actionsEnum: {PRODUCT_ADD, PRODUCT_UPDATE, PRODUCT_DELETE},
    fileOptionsEnum: {PRODUCTS_DIR},
    responseStatusCode: {OK}
} = require('../../constants');
const {ErrorHandler} = require('../../error');
const {hash, uploadPhoto} = require('../../helpers');
const {emailService, productService, userService} = require('../../services');

module.exports = {
    getProducts: async (req, res, next) => {
        try {
            const products = await productService.getAllProducts();

            res.json(products);
        } catch (e) {
            next(new ErrorHandler(e));
        }
    },

    getProductById: async (req, res) => {
            res.json(req.product);
    },

    createProduct: async (req, res, next) => {
        try {
            const user = await userService.getUserById(req.user_id);
            const [photo] = req.photos;

            req.body.codeWord = await hash(req.body.codeWord);
            req.body.user_id = req.user_id;
            console.log(req.body);
            const {id} = await productService.createNewProduct(req.body);

            if (photo) {
                const photoPath = await uploadPhoto(id, photo, PRODUCTS_DIR);

                await productService.updateProduct(id, {photo: photoPath})
            }

            emailService.sendEmail(user.email, PRODUCT_ADD, {...req.body, userName: user.name})
                .catch(() => {});

            res.redirect('/products');
        } catch (e) {
            next(new ErrorHandler(e));
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

            res.sendStatus(OK);
        } catch (e) {
            next(new ErrorHandler(e));
        }
    },

    deletePhoto: async (req, res, next) => {
        try {
            const {id} = req.product;

            await productService.updateProduct(id, {photo: null});

            res.sendStatus(OK);
        } catch (e) {
            next(new ErrorHandler(e));
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const {productId} = req.params;
            const {name} = req.product;
            const [photo] = req.photos;

            const user = await userService.getUserById(req.user_id);

            if (photo) {
                req.body.photo = await uploadPhoto(productId, photo, PRODUCTS_DIR);
             }

            await productService.updateProduct(productId, req.body);
            emailService.sendEmail(user.email, PRODUCT_UPDATE, {...req.body, name, userName: user.name})
                .catch(() => {});

            res.sendStatus(OK);
        } catch (e) {
            next(new ErrorHandler(e));
        }
    }
};
