const {
    ErrorHandler,
    errorsEnum: {ERR_NOT_FOUND}
} = require('../../error');
const {checkHash, createTokens} = require('../../helpers');
const {authService, userService} = require('../../services');
const {
    responseStatusCode: {NOT_FOUND, OK},
    requestHeadersEnum: {AUTHORIZATION}
} = require('../../constants');

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
            next(new ErrorHandler(e))
        }
    },

    logout: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            await authService.deleteByParams({access_token});

            res.sendStatus(OK);
        } catch (e) {
            next(new ErrorHandler(e))
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {user_id} = req;
            const refresh_token = req.get(AUTHORIZATION);

            const user = await userService.getUserById(user_id);

            if (!user) {
                return next(new ErrorHandler(
                    ERR_NOT_FOUND.msg,
                    NOT_FOUND,
                    ERR_NOT_FOUND.code
                ));
            }

            const tokens = createTokens();

            await authService.deleteByParams({refresh_token});
            await authService.createTokensPair(user.id, tokens);

            res.sendStatus(tokens);
        } catch (e) {
            next(new ErrorHandler(e))
        }
    }
};
