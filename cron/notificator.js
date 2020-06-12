const {emailService, userService, productService} = require('../services');
const {actionsEnum: {NOTIFY_USERS}} = require('../constants');

module.exports = async () => {
    const products = await productService.getProductsByParams({photo: null});
    const usersIds = new Set();
    const userProducts = {};

    products.forEach(product => {
        const {user_id} = product;

        usersIds.add(user_id);

        if (!userProducts[user_id]) {
            userProducts[user_id] = [];
        }

        userProducts[user_id].push(product);
    });

    const users = await userService.getUsersByIds([...usersIds]);

    for (const user of users) {
        emailService.sendEmail(user.email, NOTIFY_USERS, {userName: user.name, products: userProducts[user.id]})
            .catch(() => {})
    }
};
