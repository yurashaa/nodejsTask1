const bcrypt = require('bcrypt');

const {ErrorHandler, errorsEnum} = require('../error');
const {responseStatusCode} = require('../constants');

module.exports = async (password, hashPassword) => {
    const result = await bcrypt.compare(password, hashPassword);

    if(!result) {
        throw new ErrorHandler(
            errorsEnum.ERR_NOT_VALID_PASSWORD.msg,
            responseStatusCode.UNAUTHORIZED,
            errorsEnum.ERR_NOT_VALID_PASSWORD.code
        );
    }
};
