const jwt = require('jsonwebtoken');

const {ErrorHandler, errorsEnum} = require('../error');
const {responseStatusCode} = require('../constants');

module.exports = (token, word) => {
    jwt.verify(token, word, err => {
        if(err) {
            throw new ErrorHandler(
                errorsEnum.ERR_NOT_VALID_TOKEN.msg,
                responseStatusCode.UNAUTHORIZED,
                errorsEnum.ERR_NOT_VALID_TOKEN.code
            );
        }
    })
};
