
const { PrismaClient } = require('@prisma/client');
const AppError = require('../utils/AppError.js');
const prisma = new PrismaClient()


async function createPost(id, content, image) {
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

module.exports = {createPost};