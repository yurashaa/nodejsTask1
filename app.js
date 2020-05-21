const express = require('express');
const expressBars = require('express-handlebars');
const { join } = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

express.static(join(__dirname, 'static', 'views'));

app.engine('.hbs', expressBars({
    defaultLayout: false,
    extname: '.hbs',
}));

app.set('view engine', '.hbs');
app.set('views', join(__dirname, 'static', 'views'));

let users = [
    {
        name: 'Vova',
        age: 21,
        email: 'vova2@ukr.net',
        password: '1111',
    },
    {
        name: 'Masha',
        age: 19,
        email: 'masha@gmail.com',
        password: '2222',
    }
];

app.get('/', (req, res) => {
    res.render('main');
});

app.get('/registration', (req, res) => {
    res.render('reg');
});

app.post('/registration', (req, res) => {
    const sameEmailUserId = users.findIndex(user => user.email === req.body.email);
    if( sameEmailUserId <= -1) {
        users.push(req.body);
        res.render('reg', {reg: true})
    } else {
        res.render('reg', {unreg: true});
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const userLogin = users.find(user => user.email === email && user.password === password);

    if(userLogin) {
        res.render('login', {log: true, name: userLogin.name});
    } else {
        res.render('login', {unlog: true});
    }
});

app.get('/users', (req, res) => {
    res.render('users', {users});
});

app.listen(3000, err => {
    if (err) console.log(err);
    else console.log("Listening 3000...");
});

