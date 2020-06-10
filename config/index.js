module.exports = {
    PORT: process.env.PORT || 3000,

    ROOT_EMAIL: process.env.ROOT_EMAIL || 'yuyuspamer@gmail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'spamer111',
    ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'gmail',

    FRONTEND_URL: process.env.FRONTEND_URL || 'http://github.com/yurashaa',

    DB_NAME: process.env.DB_NAME || 'shop',
    DB_USER_NAME: process.env.DB_USER_NAME || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'root',
    HOST: process.env.HOST || 'localhost'
};
