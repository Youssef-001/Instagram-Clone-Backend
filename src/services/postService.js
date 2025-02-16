
const { PrismaClient } = require('@prisma/client');
const AppError = require('../utils/AppError.js');
const prisma = new PrismaClient()


async function createPost(id, content) {
    try {
        const post = await prisma.post.create({
            data: {
                authorId: id,
                content: content,
            }
        });
        return post;
    }
    catch(err)
    {
        throw new AppError(err.message, 400);
    }
}

async function uploadImage(postId, url) {
    try {
        const image = await prisma.image.create({
            data: {
                postId: postId,
                url: url
            }
        })
    }catch(err)
    {
        throw new AppError(err.message, 400);
    }
}

async function getUserPosts(userId) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                username: true,
                email: true, // Specify only the user fields you need
                avatar: true,
                posts: {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true
                    }
                }
            }
        });

        if (!user) {
            throw new AppError("User not found", 404);
        }

        return user;
    } catch (err) {
        throw new AppError(err.message, 400);
    }
}

module.exports = {createPost, uploadImage, getUserPosts};