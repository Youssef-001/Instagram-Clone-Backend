const { PrismaClient } = require('@prisma/client');
const AppError = require('../utils/AppError.js');
const prisma = new PrismaClient()

async function followUser(senderId, receiverId) {
    try {
        // Prevent self-following
        if (senderId === receiverId) {
            throw new AppError("You cannot follow yourself", 400);
        }

        // Check if already following
        const existingFollow = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: senderId,
                    followingId: receiverId
                }
            }
        });

        if (existingFollow) {
            throw new AppError("User is already being followed", 409);
        }

        // Create follow relationship
        const follow = await prisma.follow.create({
            data: {
                followerId: senderId,
                followingId: receiverId
            },
            include: {
                follower: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                following: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            }
        });

        return {
            status: "success",
            message: "User successfully followed",
            data: {
                follower: follow.follower,
                following: follow.following,
                followedAt: follow.createdAt
            }
        };
    } catch (err) {
        throw new AppError(err.message, err.statusCode || 400);
    }
}


async function unfollowUser(senderId, receiverId) {

    try {
        // Check if following
        const existingFollow = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: senderId,
                    followingId: receiverId
                }
            }
        });

        if (!existingFollow) {
            throw new AppError("User is not being followed", 404);
        }

        await prisma.follow.delete({
            where: {
                followerId_followingId: {
                    followerId: senderId,
                    followingId: receiverId
                }
            }
        });

        return {
            status: "success",
            message: "User successfully unfollowed"
        };
    } catch (err) {
        throw new AppError(err.message, err.statusCode || 400);
    }
}

module.exports = {followUser,unfollowUser}