const {authService: {getAllTokens}} = require('../services');
const {numbersEnum: {MS_PER_DAY}} = require('../constants');

module.exports = async () => {
    const tokens = await getAllTokens();

    for (const token of tokens) {
        const {created_at} = token;
        const dateDiff = (new Date() - new Date(created_at)) / MS_PER_DAY;

        if (dateDiff > 1) {
            token.destroy();
        }
    }
};
