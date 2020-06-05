const express = require('express');

const router = require('./routes');
const db = require('./database').getInstance();
db.setModels();

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(router);

app.listen(3000, () => {
    console.log('3000 is working...');
});
