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



module.exports = {createUser}

