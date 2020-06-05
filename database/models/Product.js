const {tableNamesEnum, modelNamesEnum} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(modelNamesEnum.PRODUCT, {
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
        tableName: tableNamesEnum.PRODUCT,
        timestamps: false
    });

    return Product;
};
