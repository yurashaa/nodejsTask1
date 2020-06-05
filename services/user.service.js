const db = require('../database').getInstance();
const {modelNamesEnum: {USER}} = require('../constants');

class UserService {

    getAllUsers() {
        const UserModel = db.getModel(USER);

        return UserModel.findAll({});
    }

    getUserById(id) {
        const UserModel = db.getModel(USER);

        return UserModel.findByPk(id);
    }

    createNewUser(newUser) {
        const UserModel = db.getModel(USER);

        return UserModel.create(newUser);
    }

    deleteUserById(id) {
        const UserModel = db.getModel(USER);

        return UserModel.destroy({where: {id}});
    }

    updateUserById(id, updatedUser) {
        const UserModel = db.getModel(USER);

        return UserModel.update(updatedUser, {
            where: {
                id,
            }
        })
    }

    getUserByParams(params) {
        const UserModel = db.getModel(USER);

        return UserModel.findOne({where: params});
    }
}

module.exports = new UserService;
