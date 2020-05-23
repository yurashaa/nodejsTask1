const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');

const User = require('./models/User');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayout);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
    res.render('main');
});

app.get('/register', (req, res) => {
    res.render('register', {msg: 0});
});

app.post('/register', (req, res) => {
    const {email, password, name} = req.body;

    const newUser = new User(name, email, password);

    let answer = newUser.addUser();

    if (answer) {
        console.log(User.getUsers());
        res.redirect('/login');
    } else {
        console.log(User.getUsers());
        res.render('register', {msg: 'USER WITH THIS EMAIL ALREADY EXISTS'});
    }
});

app.get('/login', (req, res) => {
    res.render('login', {msg: 0});
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = User.findUser(email, password);

    if(user) {
        res.redirect('/users');
    } else {
        res.render('login', {msg: 'Check your data for being correct'});
    }
});

app.get('/users', (req, res) => {
    const users = User.getUsers();
    res.render('users', {users});
});

app.listen(3000, () => {
    console.log('3000 is working');
    User.fetchUsers();
});
