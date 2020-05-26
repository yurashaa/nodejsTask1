const {productService} = require('../services');

module.exports = async (req, res, next) => {
    try {
        const {id} = req.body;

        const productById = await productService.getProductById(id);

        if (productById)
            throw new Error('Product with this id already exists');


        next();
    } catch (e) {
        console.log(e.message);
        res.json(e.message);
    }
};
