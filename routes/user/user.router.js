const {Router} = require('express');

const {userController} = require('../../controllers');
const {
    userMiddlewares: {
        userValidity,
        isUserIdExists,
        isUserEmailFree,
        updateValidity
    }} = require('../../middlewares');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:userId', isUserIdExists, userController.getUserById);

userRouter.post('/', userValidity, isUserEmailFree, userController.createNewUser);

userRouter.delete('/:userId', isUserIdExists, userController.deleteUserById);

userRouter.put('/:userId', updateValidity, isUserIdExists, userController.updateUserById);

module.exports = userRouter;
