const {productService} = require('../../services');

module.exports = {
    getProducts: async (req, res) => {
        try {
            const products = await productService.getAllProducts();
            res.json(products);
        } catch (e) {
            res.json(e.message);
        }
    },

    getProductById: async (req, res) => {
        try {
            const {id} = req.params;

            const productById = await productService.getProductById(id);
            res.json(productById);
        } catch (e) {
            res.json(e.message);
        }
    },

    createProduct: async (req, res) => {
        try {
            await productService.createNewProduct(req.body);
            res.redirect('/products');
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;

            await productService.deleteProductById(+id);
            res.redirect('/products');
        } catch (e) {
            res.json(e.message);
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;

            await productService.updateProduct(id, req.body);
            res.redirect('/products');
        } catch (e) {
            res.json(e.message);
        }
    }
};
