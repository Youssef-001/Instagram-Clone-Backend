const userService = require('../services/userService.js');
const AppError = require('../utils/AppError.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
require('dotenv').config();

async function signup(req, res, next) {
    const { googleId, email, username } = req.body;

    // Check if username is already taken
    const existingUser = await prisma.user.findUnique({
        where: { username }
    });

    if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
    }

    // Create new user with googleId, email, and chosen username
   const user = await userService.createUser(googleId, email, username)

    // Generate JWT for the new user
    const jwtToken = jwt.sign(
        { userId: user.id, email: user.email, name: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    // Return the JWT so the frontend can store and authenticate the user
    res.json({ message: "Username set successfully", jwtToken })
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

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
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
