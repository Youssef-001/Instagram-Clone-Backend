"use strict";
const authController = require('../controllers/authController.ts');
const router = require('express').Router();
router.post('/signup', (req, res) => {
    authController.signup(req, res);
});
