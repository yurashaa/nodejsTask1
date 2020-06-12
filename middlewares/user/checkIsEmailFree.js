const {ErrorHandler, errorsEnum} = require('../../error');
const {userService} = require('../../services');
const {responseStatusCode} = require('../../constants');
module.exports = async (req, res, next) => {
    try {
        const {email} = req.body;

        const user = await userService.getUserByParams({email});

        if(user) {
            return next(new ErrorHandler(
                errorsEnum.ERR_EMAIL_EXISTS.msg,
                responseStatusCode.BAD_REQUEST,
                errorsEnum.ERR_EMAIL_EXISTS.code
            ));
        }

        next();
    } catch (e) {
        next(new ErrorHandler(e));
    }
};
