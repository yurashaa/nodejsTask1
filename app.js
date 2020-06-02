const express = require('express');

const { productRouter } = require('./routes');
const db = require('./database').getInstance();
db.setModels();

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/products', productRouter);

app.use('*', (err, req, res, next) => {
    const {message, status, customCode} = err;

    res
        .status(status || 400)
        .json({message, customCode});
});

app.listen(3000, () => {
    console.log('3000 is working...');
});
