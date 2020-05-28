const db = require('../database').getInstance();

class ProductService {

    getAllProducts() {
        const ProductModel = db.getModel('Product');
        return ProductModel.findAll({});
    }

    async createNewProduct(newProduct){
        const ProductModel = db.getModel('Product');
        return ProductModel.create(newProduct);
    }

    getProductById(id) {
        const ProductModel = db.getModel('Product');
        return ProductModel.findByPk(id);
    }

    deleteProductById(id) {
        const ProductModel = db.getModel('Product');
        return ProductModel.destroy({
            where: {
                id,
            }
        })
    }

    updateProduct(id, updatedData) {
        const ProductModel = db.getModel('Product');
        return ProductModel.update(updatedData, {
            where: {
                id,
            }
        })
    };
}

module.exports = new ProductService;
