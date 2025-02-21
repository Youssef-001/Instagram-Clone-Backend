

const AppError = require('../utils/AppError.js');
const postService = require('../services/postService.js');
const prisma = require('@prisma/client');
const { post } = require('../routes/posts.js');
const prismaClient = new prisma.PrismaClient();
const notificationService = require('../services/notificationService.js')
async function createPost(req,res,next)
{
    const content = req.body.content || "";
    const image = req.file;
    if ( !image)
    {
        throw new AppError("image is required", 400);
    }

    try {
        const post = await postService.createPost(req.user.userId, content);
        await postService.uploadImage(post.id, image.path);
        res.status(200).json(post);
    }
    catch(err)
    {
        next(err);
    }

}

async function getUserPosts(req,res,next)
{
    const userId = req.params.userId
    const posts = await postService.getUserPosts(userId);
    res.status(200).json(posts);
}


const getFeed = async (req, res, next, { userId, cursor, pageSize }) => {
    try {
        // Fetch the list of users this user follows
        const posts = await postService.getFeed(userId,cursor,pageSize)
        console.log(userId)

        // Check if there's a next cursor
        let nextCursor = null;
        if (posts.length > pageSize) {
            const nextPost = posts.pop(); // Remove the extra post
            nextCursor = nextPost.createdAt.toISOString(); // Use its timestamp as next cursor
        }

        // Send response with next cursor
        console.log('there, ', posts)
        res.json({
            posts,
            nextCursor, // Send this to the client for the next request
        });
    } catch (error) {
        next(error);
    }
};

async function getPost(req,res,next)
{
    const postId = req.params.postId;
    try {
        const post = await postService.getPost(postId);

        res.json(200).json(post);

    }
    catch(err)
    {
        next(err);

    }
    return post;
}   


async function likePost(req,res,next)
{
    const postId = req.params.postId;
    const userId = req.user.userId;

    try {
        const like = await postService.likePost(userId, postId);
        let post = await postService.getPost(postId);
        let receiverId = post.author.id;
        const notification = await notificationService.createNotification(userId, receiverId, "LIKE", postId);
        res.status(200).json(like);
    }
    catch(err)
    {
        next( new AppError(err.message || "Something went wrong", err.statusCode || 500));
    }

}

async function unlikePost(req,res,next)
{
    const postId = req.params.postId;
    const userId = req.user.userId;

    try {
        const like = await postService.unlikePost(userId, postId);
        res.status(200).json(like);
    }
    catch(err)
    {
        next( new AppError(err.message || "Something went wrong", err.statusCode || 500));
    }
}


module.exports = {createPost, getUserPosts, getFeed, getPost, likePost, unlikePost}