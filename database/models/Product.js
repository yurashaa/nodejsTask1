const tableName = 'product';
const moduleName = 'Product';

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(moduleName, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    }, {
        tableName,
        timestamps: false
    });

    return Product;
};
