const {ErrorHandler, errorsEnum} = require('../../error');
const {userService} = require('../../services');
const {responseStatusCode} = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const {email} = req.body;
        const user = await userService.getUserByParams({email});

        if(!user) {
            return next(new ErrorHandler(
                errorsEnum.ERR_NO_USER.msg,
                responseStatusCode.NOT_FOUND,
                errorsEnum.ERR_NO_USER.code
            ));
        }

        req.user = user;

        next();
    } catch (e) {
        next(new ErrorHandler(
            errorsEnum.ERR_NO_USER.msg,
            responseStatusCode.NOT_FOUND,
            errorsEnum.ERR_NO_USER.code
        ));
    }
};
