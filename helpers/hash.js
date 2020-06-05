const bcrypt = require('bcrypt');

module.exports = (data) => bcrypt.hash(data, 10);

