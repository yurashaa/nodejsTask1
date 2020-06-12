const {ErrorHandler} = require('../../error');
const {
    actionsEnum: {USER_REGISTER, USER_UPDATE, USER_DELETE},
    fileOptionsEnum: {USERS_DIR},
    responseStatusCode: {OK}
} = require('../../constants');
const {hash, uploadPhoto} = require('../../helpers');
const {emailService, userService} = require('../../services');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();

            res.json(users);
        } catch (e) {
            next(new ErrorHandler(e));
        }
    },

    getUserById: async (req, res) => {
        res.json(req.user);
    },

    createNewUser: async (req, res, next) => {
        try {
            const user = req.body;
            const [photo] = req.photos;

            user.password = await hash(user.password);

            const {id} = await userService.createNewUser(user);

            if (photo) {
                const photoPath = await uploadPhoto(id, photo, USERS_DIR);

                await userService.updateUserById(id, {photo: photoPath});
            }

            emailService.sendEmail(user.email, USER_REGISTER, user)
                .catch(() => {});

            res.redirect('/users');
        } catch (e) {
            next(new ErrorHandler(e));
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = req.user;

            await userService.deleteUserById(+userId);
            emailService.sendEmail(user.email, USER_DELETE, {name: user.name})
                .catch(() => {});

            res.sendStatus(OK);
        } catch (e) {
            next(new ErrorHandler(e));
        }
    },

    deletePhoto: async (req, res, next) => {
        try {
            const id = req.user_id;

            await userService.updateUserById(id, {photo: null});

            res.sendStatus(OK);
        } catch (e) {
            next(new ErrorHandler(e));
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = req.user;
            const [photo] = req.photos;

            if (photo) {
                req.body.photo = await uploadPhoto(userId, photo, USERS_DIR);
            }

            await userService.updateUserById(userId, req.body);
            emailService.sendEmail(user.email, USER_UPDATE, req.body)
                .catch(() => {});

            res.redirect('/users');
        } catch (e) {
            next(new ErrorHandler(e));
        }
    }
};
