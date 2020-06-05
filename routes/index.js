const {Router} = require('express');

const authRouter = require('./auth/auth.router');
const productRouter = require('./product/product.router');
const userRouter = require('./user/user.router');

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/users', userRouter);

router.use('*', (err, req, res, next) => {
    const {message, status, customCode} = err;

    res
        .status(status || 400)
        .json({message, customCode});
});

module.exports = router;
