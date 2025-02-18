const authController = require('../controllers/authController.js');
const express = require('express');
const verifyJWT = require('../middlewares/verifyJwt.js');
const router = express.Router();
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

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/failure',
}), (req, res) => {
    const { jwtToken } = req.user;

    res.json({ message: 'Authentication successful', token: jwtToken });
});

router.get('/failture', (req,res) => {
    res.send('Authentication failed');
})

router.get('/protected',verifyJWT, (req,res) => {
    res.send("You are authenticated with google");
})


module.exports = router;