const db = require('../database').getInstance();
const {modelNamesEnum: {PRODUCT}} = require('../constants');

class ProductService {

    getAllProducts() {
        const ProductModel = db.getModel(PRODUCT);
        return ProductModel.findAll({});
    }

    getProductById(id) {
        const ProductModel = db.getModel(PRODUCT);
        return ProductModel.findByPk(id);
    }

    getProductsByParams(params) {
        const ProductModel = db.getModel(PRODUCT);
        return ProductModel.findAll({where: params});
    }

    createNewProduct(newProduct){
        const ProductModel = db.getModel(PRODUCT);
        return ProductModel.create(newProduct);
    }

    deleteProductById(id) {
        const ProductModel = db.getModel(PRODUCT);
        return ProductModel.destroy({
            where: {
                id,
            }
        })
    }

    updateProduct(id, updatedData) {
        const ProductModel = db.getModel(PRODUCT);
        return ProductModel.update(updatedData, {
            where: {
                id,
            }
        })
    };
}

module.exports = new ProductService;
