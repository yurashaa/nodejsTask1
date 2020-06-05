const {requestHeadersEnum, responseStatusCode, wordsEnum} = require('../../constants');
const {ErrorHandler, errorsEnum} = require('../../error');
const {tokenVerificator} = require('../../helpers');
const {authService} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const access_token = req.get(requestHeadersEnum.AUTHORIZATION);

        if(!access_token) {
            return next(new ErrorHandler(
                errorsEnum.ERR_NOT_VALID_TOKEN.msg,
                responseStatusCode.UNAUTHORIZED,
                errorsEnum.ERR_NOT_VALID_TOKEN.code
            ));
        }

        tokenVerificator(access_token, wordsEnum.JWT_SECRET);

        const tokensDB = await authService.getTokensByParams({access_token});

        if(!tokensDB) {
            return next(new ErrorHandler(
                errorsEnum.ERR_NOT_VALID_TOKEN.msg,
                responseStatusCode.UNAUTHORIZED,
                errorsEnum.ERR_NOT_VALID_TOKEN.code
            ));
        }

        req.user_id = tokensDB.user_id;
        next();
    } catch (e) {
        next(new ErrorHandler(e.message))
    }
};
