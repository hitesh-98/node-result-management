const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/loginTeacher', (req, res) => {
    res.render('loginTeacher');
});

router.get('/registerTeacher', (req, res) => {
    res.render('registerTeacher');
});

module.exports = router;

