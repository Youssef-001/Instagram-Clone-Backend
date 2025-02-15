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


function isLoggedIn(req,res, next)
{
    if (req.user)
    {
        next();
    }
    else 
    {
        res.sendStatus(401);
    }
}

router.get('/google', (req,res) => {
    res.send('<a href="/auth/google-auth"> Auhenticate with google </a>');
})
router.get('/google-auth', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/auth/protected',
    failureRedirect: '/failture'
}))

router.get('/protected',isLoggedIn, (req,res) => {
    res.send("You are authenticated with google");
})



module.exports = router;