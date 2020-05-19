const { join } = require('path');

const moveStudents = require('./moveStudents');

const students18 = "1800";
const students20 = "2000";

moveStudents(join(__dirname, students20), join(__dirname, students18));
