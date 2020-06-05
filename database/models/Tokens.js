const {modelNamesEnum, tableNamesEnum} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const Tokens = sequelize.define(modelNamesEnum.TOKENS, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        access_token: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        refresh_token: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now'),
        }
    }, {
        tableName: tableNamesEnum.TOKENS,
        timestamps: false,
    });

    return Tokens;
};
