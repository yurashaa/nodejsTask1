const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const router = require('./routes');
const {PORT} = require('./config');
const db = require('./database').getInstance();
db.setModels();

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'));

app.use(router);

app.listen(PORT, () => {
    console.log(`${PORT} is working...`);
});
