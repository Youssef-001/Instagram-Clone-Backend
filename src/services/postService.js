
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
                email: true,
                avatar: true,
                posts: {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        images: {  // Include images for each post
                            select: {
                                url: true,
                            }
                        }
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


const getFeed = async (userId,cursor,pageSize) => {
    const following = await prisma.follow.findMany({
        where: { followerId: userId },
        select: { followingId: true },
    });

    const followingIds = following.map(f => f.followingId); // Extract user IDs
    console.log(followingIds)
    if (followingIds.length === 0) {
        return res.json({ posts: [], nextCursor: null }); // No posts if not following anyone
    }


    let whereCondition = { authorId: { in: followingIds } };

    // If cursor exists, fetch posts **created before** the cursor
    if (cursor) {
        whereCondition.createdAt = { lt: new Date(cursor) }; 
    }

    // Fetch posts ordered by newest first
    const posts = await prisma.post.findMany({
        where: whereCondition,
        orderBy: { createdAt: 'desc' },
        take: pageSize + 1, // Fetch one extra post to check if there's a next page
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                    avatar: true
                }
            }
        }
    });

    console.log(posts)

    return posts;
};

module.exports = {createPost, uploadImage, getUserPosts, getFeed};