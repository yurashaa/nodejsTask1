const {ErrorHandler, errorsEnum} = require('../../error');
const {checkHash, createTokens} = require('../../helpers');
const {authService, userService} = require('../../services');
const {responseStatusCode, requestHeadersEnum} = require('../../constants');

module.exports = {
    login: async (req, res, next) => {
        try {
            const user = req.user;
            const {password} = req.body;

            await checkHash(password, user.password);

            const tokens = createTokens();

            await authService.createTokensPair(user.id, tokens);

            res.json(tokens);
        } catch (e) {
            next(new ErrorHandler(e.message))
        }
    },

    logout: async (req, res, next) => {
        try {
            const access_token = req.get(requestHeadersEnum.AUTHORIZATION);

            await authService.deleteByParams({access_token});

            res.sendStatus(200);
        } catch (e) {
            next(new ErrorHandler(e.message))
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {user_id} = req;
            const refresh_token = req.get(requestHeadersEnum.AUTHORIZATION);

            const user = await userService.getUserById(user_id);

            if(!user) {
                return next(new ErrorHandler(
                    errorsEnum.ERR_NOT_FOUND.msg,
                    responseStatusCode.NOT_FOUND,
                    errorsEnum.ERR_NOT_FOUND.code
                ));
            }

            const tokens = createTokens();

            await authService.deleteByParams({refresh_token});
            await authService.createTokensPair(user.id, tokens);

            res.sendStatus(200);
        } catch (e) {
            next(new ErrorHandler(e.message))
        }
    }
};
