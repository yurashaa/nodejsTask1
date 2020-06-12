const {
    ErrorHandler,
    errorsEnum: {ERR_NOT_VALID_TOKEN}
} = require('../../error');
const {
    requestHeadersEnum,
    responseStatusCode: {UNAUTHORIZED},
    wordsEnum
} = require('../../constants');
const {tokenVerificator} = require('../../helpers');
const {authService} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const refresh_token = req.get(requestHeadersEnum.AUTHORIZATION);
        if(!refresh_token) {
            return next(new ErrorHandler(
                ERR_NOT_VALID_TOKEN.msg,
                UNAUTHORIZED,
                ERR_NOT_VALID_TOKEN.code
            ));
        }

        tokenVerificator(refresh_token, wordsEnum.JWT_REFRESH_SECRET);

        const tokensDB = await authService.getTokensByParams({refresh_token});

        if(!tokensDB) {
            return next(new ErrorHandler(
                ERR_NOT_VALID_TOKEN.msg,
                UNAUTHORIZED,
                ERR_NOT_VALID_TOKEN.code
            ));
        }

        req.user_id = tokensDB.user_id;
        next();
    } catch (e) {
        next(new ErrorHandler(e))
    }
};
