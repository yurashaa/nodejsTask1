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
            productById ? res.json(productById) : res.json({findById: false});
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

            const isDeleted = await productService.deleteProductById(+id);
            isDeleted ? res.redirect('/products') : res.json({deleted: false});
        } catch (e) {
            res.json(e.message);
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;

            const [isUpdated] = await productService.updateProduct(id, req.body);
            isUpdated ? res.redirect('/products') : res.json({updated: false});
        } catch (e) {
            res.json(e.message);
        }
    }
};
