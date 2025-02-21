const AppError = require('../utils/AppError.js');
const commentService = require('../services/commentService.js');
const postController = require('../controllers/postsController.js');
const postService = require('../services/postService.js');
const notificationService = require('../services/notificationService.js')
async function createComment(req, res, next) {
    const postId = req.params.postId;
    const content = req.body.content;
    const userId = req.user.userId;
    const parentId = req.query.parentId || null;

    if (!content) {
        return next(new AppError("Content is required", 400)); // Pass to error middleware
    }

    try {
        const comment = await commentService.createComment(postId, userId, parentId, content);
        const post = await postService.getPost(postId);
        const notification = await notificationService.createNotification(userId, post.author.id, "COMMENT", postId)
        res.status(201).json({ message: "Comment created successfully", comment });
    } catch (err) {
        next(new AppError(err.message || "Something went wrong", err.statusCode || 500)); // Pass error to middleware
    }
}



async function getComments(req,res,next)
{
    const postId = req.params.postId;
    const offSet = req.query.offSet || 0;
    const limit = 20;

    try {
        const comments = await commentService.getComments(postId, offSet, limit);
        res.status(200).json(comments);
    }
    catch(err)
    {
        next(new AppError(err.message || "Something went wrong", err.statusCode || 500));
    }
}


async function deleteComment(req,res,next)
{
    const commentId = req.params.commentId;
    const userId = req.user.userId;
    const postId = req.params.postId;
    // either userId the same as deleted commentId
    // or userId is the author of the post

    const post = await postService.getPost(postId);
    const comment = await commentService.getComment(commentId);

    if (userId !== comment.author.id && userId !== post.author.id)
    {
        return next(new AppError("You are not authorized to delete this comment", 403));
    }

    try {
        const comment = await commentService.deleteComment(commentId);
        res.status(200).json({ message: "Comment deleted successfully", comment });
    }
    catch(err)
    {
        next(new AppError(err.message || "Something went wrong", err.statusCode || 500));
    }
}

module.exports = { createComment, getComments, deleteComment };
