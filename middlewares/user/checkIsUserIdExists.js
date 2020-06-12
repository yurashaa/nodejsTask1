const {userService} = require('../../services');
const {ErrorHandler, errorsEnum} = require('../../error');
const {responseStatusCode} = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await userService.getUserById(userId);

        if(!user) {
            return next(new ErrorHandler(
                errorsEnum.ERR_NO_USER_ID.msg,
                responseStatusCode.NOT_FOUND,
                errorsEnum.ERR_NO_USER_ID.code
            ));
        }

        req.user = user;
        next();
    } catch (e) {
        next(new ErrorHandler(e));
    }
};
