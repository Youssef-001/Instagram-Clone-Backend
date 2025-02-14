const authController = require('../controllers/authController.js');
const express = require('express');

const router = express.Router();

router.post('/signup', (req, res, next) => {
    authController.signup(req, res,next);
})

module.exports = router;