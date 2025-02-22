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



async function getComments(postId, offSet, limit) {
    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true
                    }
                },
                comments: {
                    skip: offSet,
                    take: limit,
                    include: {
                        author: {
                            select: {
                                id: true,
                                username: true,
                                avatar: true
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' } // Optional: Order comments by newest first
                }
            }
        });

        if (!post) {
            throw new AppError("Post not found", 404);
        }

        return post;
    } catch (err) {
        throw new AppError(err.message || "Could not fetch post", 500);
    }
}


async function getComment(commentId)
{
   
        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true
                    }
                }
            }
        })

        if (!comment) {
            throw new AppError("Comment not found", 404);
        }
    return comment;
}


async function deleteComment(commentId)
{
    try {
        const comment = await prisma.comment.delete({
            where: {
                id: commentId
            }
        });
        return comment;
    }
    catch(err)
    {
        throw new AppError(err.message, 400);
    }
}

module.exports = {createComment, getComments, getComment, deleteComment}