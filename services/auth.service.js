const db = require('../database').getInstance();
const {modelNamesEnum: {TOKENS}} = require('../constants');

class AuthService {
    getAllTokens() {
        const TokensModel = db.getModel(TOKENS);

        return TokensModel.findAll({});
    }

    getTokensByParams(params) {
        const TokensModel = db.getModel(TOKENS);

        return TokensModel.findOne({where: params});
    }

    createTokensPair(user_id, tokens) {
        const TokensModel = db.getModel(TOKENS);

        return TokensModel.create({...tokens, user_id});
    }

    deleteByParams(params) {
        const TokensModel = db.getModel(TOKENS);

        return TokensModel.destroy({where: params});
    }
}

module.exports = new AuthService;
