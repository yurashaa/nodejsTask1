const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const {DB_NAME, DB_USER_NAME, DB_PASSWORD, HOST} = require('../config');

module.exports = (() => {
    let instance;

    function initConnection() {
        const client = new Sequelize(DB_NAME, DB_USER_NAME, DB_PASSWORD, {
            host: HOST,
            dialect: 'mysql'
        });

        let models = {};

        function getModels() {
            fs.readdir(path.join(process.cwd(), 'database', 'models'), (err, files) => {
                files.forEach(file => {
                    const [modelName] = file.split('.');
                    models[modelName] = client.import(path.join(process.cwd(), 'database', 'models', modelName));
                });
            });
        }

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName],
        }
    }

    return {
        getInstance: () => {
            if(!instance) {
                instance = initConnection();
            }

            return instance;
        }
    }
})();
