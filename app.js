const express = require('express');

const { productRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/products', productRouter);

app.listen(3000, () => {
    console.log('3000 is working...');
});
