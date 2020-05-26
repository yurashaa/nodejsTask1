const fs = require('fs');
const path = require('path');

const productsPath = path.join('products', 'products.txt');

class ProductService {
    getAllProducts() {
        let products = [];
        
        return new Promise((resolve, reject) => {
            fs.readFile(productsPath, (err, data) => {
                if(err) reject('Failed to open the file');
                if(data.toString()){
                    products = JSON.parse(data.toString());
                }
                resolve(products);
            })
        })
    }

    async createNewProduct(newProduct){
        const products = await this.getAllProducts();
        await this.updateFile([...products,newProduct]);
    }

    async getProductById(id) {
        const products = await this.getAllProducts();
        return products.find(product => product.id === +id);
    }

    async deleteProductById(id) {
        const products = await this.getAllProducts();
        const deleteId = products.findIndex(product => product.id === id);
        products.splice(deleteId, 1);
        await this.updateFile(products);
    }

    async updateProduct(updatedData) {
        const {id} = updatedData;
        const products = await this.getAllProducts();
        let newProducts = products.map(product => {
            if(product.id === id)
                return updatedData;
            return product;
        });
        await this.updateFile(newProducts);
    };

    updateFile(newData) {
        fs.writeFile(productsPath, JSON.stringify(newData), err => {
            return new Promise((resolve, reject) => {
                if(err) {
                    reject('Failed to write the file');
                }
                resolve();
            })
        })
    }
};

module.exports = new ProductService;
