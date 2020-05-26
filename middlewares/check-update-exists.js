const {productService} = require('../services');

module.exports = async (req, res, next) => {
    try{
        let { id } = req.body;

        const products = await productService.getAllProducts();

        const index = products.findIndex(product => product.id === id);

        if(index < 0)
            throw new Error('No element with this id');

        next();
    } catch (e) {
        res.json(e.message);
    }
};
