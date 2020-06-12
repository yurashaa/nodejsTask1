const {actionsEnum} = require('../constants');

module.exports = {
    [actionsEnum.USER_REGISTER]: {
        subject: '[NODE.JS] REGISTERED',
        template: 'userRegister',
    },

    [actionsEnum.USER_UPDATE]: {
        subject: '[NODE.JS] CHANGED DATA',
        template: 'userUpdate'
    },

    [actionsEnum.USER_DELETE]: {
        subject: '[NODE.JS] DELETED',
        template: 'userDelete'
    },

    [actionsEnum.PRODUCT_ADD]: {
        subject: '[NODE.JS] NEW PRODUCT',
        template: 'productCreate'
    },

    [actionsEnum.PRODUCT_UPDATE]: {
        subject: '[NODE.JS] UPDATED PRODUCT',
        template: 'productUpdate'
    },

    [actionsEnum.PRODUCT_DELETE]: {
        subject: '[NODE.JS] DELETED PRODUCT',
        template: 'productDelete'
    },

    [actionsEnum.NOTIFY_USERS]: {
        subject: '[NODE.JS] NOTIFICATION',
        template: 'noPhotoProducts'
    }
};
