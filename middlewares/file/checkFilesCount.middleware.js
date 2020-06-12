const {ErrorHandler, errorsEnum} = require('../../error');
const {responseStatusCode} = require('../../constants');

module.exports = (req, res, next) => {
    if (req.docs.length) {
        return next(new ErrorHandler(
            errorsEnum.ERR_NOT_VALID_FILES.msg,
            responseStatusCode.BAD_REQUEST,
            errorsEnum.ERR_NOT_VALID_FILES.code
        ));
    }

    if(req.photos > 1) {
        return next(new ErrorHandler(
            errorsEnum.ERR_NOT_VALID_FILES.msg,
            responseStatusCode.BAD_REQUEST,
            errorsEnum.ERR_NOT_VALID_FILES.code
        ));
    }

    next();
};
