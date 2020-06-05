const {
    ErrorHandler,
    errorsEnum: {ERR_NO_USER}
} = require('../../error');
const {userService} = require('../../services');
const {responseStatusCode: {NOT_FOUND}} = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const {email} = req.body;
        const user = await userService.getUserByParams({email});

        if(!user) {
            return next(new ErrorHandler(
                ERR_NO_USER.msg,
                NOT_FOUND,
                ERR_NO_USER.code
            ));
        }

        req.user = user;

        next();
    } catch (e) {
        next(new ErrorHandler(
            ERR_NO_USER.msg,
            NOT_FOUND,
            ERR_NO_USER.code
        ));
    }
};
