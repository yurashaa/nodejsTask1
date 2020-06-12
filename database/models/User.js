const {tableNamesEnum, modelNamesEnum} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(modelNamesEnum.USER, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        photo: {
            type: DataTypes.STRING,
        }
    },
        {
            tableName: tableNamesEnum.USER,
            timestamps: false,
        });

    return User;
};
