const {userService} = require('../../services');
const {ErrorHandler} = require('../../error');
const {hash} = require('../../helpers');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();

            res.json(users);
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    },

    getUserById: async (req, res) => {
        res.json(req.user);
    },

    createNewUser: async (req, res, next) => {
        try {
            req.body.password = await hash(req.body.password);

            await userService.createNewUser(req.body);
            res.redirect('/users');
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            await userService.deleteUserById(userId);
            res.sendStatus(204);
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            await userService.updateUserById(userId, req.body);
            res.redirect('/users');
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    }
};
