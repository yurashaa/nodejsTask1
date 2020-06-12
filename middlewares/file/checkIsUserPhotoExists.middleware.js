const {userService} = require('../../services');
const {responseStatusCode} = require('../../constants');
const {errorsEnum, ErrorHandler} = require('../../error');

module.exports = async (req, res, next) => {
    try {
        const id = req.user_id;
        const user = await userService.getUserById(id);

        if(!user.photo) {
            return next(new ErrorHandler(
                errorsEnum.ERR_NO_PHOTO.msg,
                responseStatusCode.BAD_REQUEST,
                errorsEnum.ERR_NO_PHOTO.code
            ));
        }

        next();
    } catch (e) {
        next(new ErrorHandler(
            errorsEnum.ERR_NO_PHOTO.msg,
            responseStatusCode.BAD_REQUEST,
            errorsEnum.ERR_NO_PHOTO.code
        ));
    }
};
