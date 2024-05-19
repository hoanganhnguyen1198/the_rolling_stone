const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');


const app = express();

const HOSTNAME = 'localhost';
const PORT = 8080;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'mysecrets',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static('public'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Dummy user credentials
const users = {};

// Create initial admin user
const adminUsername = 'admin';
const adminPassword = 'admin123';
users[adminUsername] = adminPassword;

// Routes
app.get('/', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] && users[username] === password) {
        req.session.user = username;
        res.redirect('/main');
    } else {
        res.render('login', { message: 'Invalid credentials' });
    }
});


app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (!users[username]) {
        users[username] = password;
        req.session.user = username;
        res.redirect('/main');
    } else {
        res.render('signup', { message: 'Username already exists' });
    }
});


app.get('/main', (req, res) => {
    if (req.session.user) {
        res.render('main', { username: req.session.user });
    } else {
        res.redirect('/');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/main');
        }
        res.redirect('/');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
