const bcrypt = require('bcrypt');

module.exports = (codeWord) => bcrypt.hash(codeWord, 10);

