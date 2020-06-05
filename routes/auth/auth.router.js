const {Router} = require('express');

const {authMiddlewares: {
    loginDataValidity,
    isUserExists,
    checkAccessToken,
    checkRefreshToken
}
} = require('../../middlewares');
const {authController} = require('../../controllers');

const authRouter = Router();

authRouter.post('/', loginDataValidity, isUserExists, authController.login);

authRouter.post('/logout', checkAccessToken, authController.logout);

authRouter.post('/refresh', checkRefreshToken, authController.refresh);

module.exports = authRouter;
