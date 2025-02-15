const userService = require('../services/userService.js');
const AppError = require('../utils/AppError.js');
const bcrypt = require('bcryptjs');

async function signup(req, res, next) {
    try {
        const { email, username, password, bdate } = req.body;

        // Hash the password using async/await
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await userService.createUser(email, username, bdate, hashedPassword);

        console.log(user);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

module.exports = { signup };
