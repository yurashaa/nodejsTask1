const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const path = require('path');
require('dotenv').config();

const db = require('./database').getInstance();
const {PORT} = require('./config');
const {cronRun} = require('./cron');
const router = require('./routes');

db.setModels();
cronRun();

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload({}));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.listen(PORT, () => {
    console.log(`${PORT} is working...`);
});
