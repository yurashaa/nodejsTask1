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

        codeWord: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        photo: {
            type: DataTypes.STRING,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {
        tableName: tableNamesEnum.PRODUCT,
        timestamps: false
    });

    return Product;
};
