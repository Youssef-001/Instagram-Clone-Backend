const { createUser } = require('../services/userService.js');
const AppError = require('../utils/AppError.js');
const bcrypt = require('bcryptjs');


// email, password, username


async function signup(req, res, next) {

    try {
        const { email, username, password, bdate } = req.body;
        if (!email || !username || !password || !bdate) {
            throw new AppError("All fields are required", 400);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(email, username, bdate, hashedPassword);
        res.status(201).json({ user });
       
    } catch(err)
    {
         next(err);
    }
}

module.exports = {signup}