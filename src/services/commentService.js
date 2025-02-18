const { PrismaClient } = require('@prisma/client');
const AppError = require('../utils/AppError.js');
const prisma = new PrismaClient()



async function createComment(postId, userId, parentId, content) {
    try {
        const comment = await prisma.comment.create({
            data: {
                postId: postId,
                authorId: userId,
                parentId: parentId,
                content: content
            },

            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    }
                }
            }
        });
        return comment;
    }
    catch (err) {
        throw new AppError(err.message, 400);
    }
}

module.exports = {createComment}