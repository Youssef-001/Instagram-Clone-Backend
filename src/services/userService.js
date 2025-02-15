const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const AppError = require('../utils/AppError.js');
const prisma = new PrismaClient()

async function createUser(email, username, bdate ,password) {

    try {
        const user = await prisma.user.create({
            data: {
                email: email,
                username: username,
                bdate: bdate,
                password: password
            }
        });
        return user;
    }
    catch(err)
    {
        throw new AppError(err.message, 400);
    }
   
}

async function findUserByEmail(email)
{
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return null; // Return null instead of throwing inside the service
        }
        return user;
    }
    catch(err)
    {
        throw new AppError("Database error", 500);
    }
}



module.exports = {createUser,findUserByEmail}

