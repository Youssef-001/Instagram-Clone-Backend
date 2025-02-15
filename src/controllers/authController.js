const userService = require('../services/userService.js');
const AppError = require('../utils/AppError.js');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config();

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


async function login(req,res,next)
{
    try {
        const { email, password } = req.body;
        const user = await userService.findUserByEmail(email);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AppError("Invalid password", 401);
        }

        const token = jsonwebtoken.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({ token: token });
    }

    catch(err)
    {
        next(err);
    }
}



module.exports = { signup, login };
