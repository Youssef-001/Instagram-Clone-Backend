const authController = require('../controllers/authController.js');
const express = require('express');
const verifyJWT = require('../middlewares/verifyJwt.js');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const AppError = require('../utils/AppError.js');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
require('../utils/googlAuth.js')
const passport = require('passport')
router.post('/signup', (req, res, next) => {
    authController.signup(req, res,next);
})

router.post('/login', (req,res,next) => {
    authController.login(req,res,next);
})


router.get('/admin', verifyJWT,(req,res,next) => {
    res.send("Hallo, you are difinitely authenticated (: ");
})




router.get('/google', (req,res) => {
    res.send('<a href="/auth/google-auth"> Auhenticate with google </a>');
})



router.get('/google-auth', passport.authenticate('google', { scope: ['profile', 'email'] }));




router.get('/username', (req,res) => {res.render('usernameForm')})

router.post('/google/signup', async(req,res,next) => {
    authController.signup(req,res,next);
})


router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/failure',
}), (req, res) => {
    const { user, jwtToken, isNew } = req.user;

    if (isNew) {
        // Redirect new users to username selection page with Google ID
        return res.redirect(`/auth/username?googleId=${req.user.googleId}&email=${req.user.email}`);
    }
    res.json({ message: 'Authentication successful', token: jwtToken });
});



router.get('/failture', (req,res) => {
    res.send('Authentication failed');
})

router.get('/protected',verifyJWT, (req,res) => {
    res.send("You are authenticated with google");
})


module.exports = router;