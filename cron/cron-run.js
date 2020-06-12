const cron = require('node-cron');

const {CRON_JOB_PERIOD} = require('../config');
const notificator = require('./notificator');

module.exports = () => {
    cron.schedule(CRON_JOB_PERIOD, () => {
        console.log('started cron');
        notificator();
    });
};
