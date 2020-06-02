const {modelNamesEnum: {PRODUCT}} = require('../../constants');

const tableName = 'product';

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(PRODUCT, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        discount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        codeWord: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    }, {
        tableName,
        timestamps: false
    });

    return Product;
};
