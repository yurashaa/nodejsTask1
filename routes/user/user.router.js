const {Router} = require('express');

const {userController} = require('../../controllers');
const {
    userMiddlewares: {
        userValidity,
        isUserIdExists,
        isUserEmailFree,
        updateValidity
    },
    fileMiddlewares: {
        checkFiles,
        checkFilesCount,
        isUserPhotoExists
    },
    authMiddlewares: {
        checkAccessToken
    }
} = require('../../middlewares');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:userId', isUserIdExists, userController.getUserById);

userRouter.post('/',
    userValidity,
    isUserEmailFree,
    checkFiles,
    checkFilesCount,
    userController.createNewUser);

userRouter.delete('/delete-photo', checkAccessToken, isUserPhotoExists, userController.deletePhoto);

userRouter.delete('/:userId', isUserIdExists, userController.deleteUserById);

userRouter.put('/:userId',
    updateValidity,
    isUserIdExists,
    checkFiles,
    checkFilesCount,
    userController.updateUserById);

module.exports = userRouter;
