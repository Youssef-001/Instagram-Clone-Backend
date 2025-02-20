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



async function updateProfile(userId, bio, avatar)
{
    const profile = await prisma.user.update({
        where: {
            id: userId
        },

        data: {
            bio: bio,
            avatar: avatar
        }
    })

    return profile;
}

async function getProfile(userId) {
    return await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            username: true,
            bio: true,
            avatar: true,
            _count: {
                select: {
                    followers: true,   // Count of followers
                    following: true    // Count of following users
                }
            }
        }
    });
}


module.exports = {createUser,findUserByEmail,updateProfile,getProfile}

