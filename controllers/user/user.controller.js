const {ErrorHandler} = require('../../error');
const {actionsEnum: {USER_REGISTER, USER_UPDATE, USER_DELETE}} = require('../../constants');
const {hash} = require('../../helpers');
const {emailService, userService} = require('../../services');

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
            const user = req.body;

            user.password = await hash(user.password);

            await userService.createNewUser(user);
            emailService.sendEmail(user.email, USER_REGISTER, user)
                .catch(() => {});

            res.redirect('/users');
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = req.user;

            await userService.deleteUserById(+userId);
            emailService.sendEmail(user.email, USER_DELETE, {name: user.name})
                .catch(() => {});

            res.sendStatus(204);
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = req.user;

            await userService.updateUserById(userId, req.body);
            emailService.sendEmail(user.email, USER_UPDATE, req.body)
                .catch(() => {});


            res.redirect('/users');
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    }
};
