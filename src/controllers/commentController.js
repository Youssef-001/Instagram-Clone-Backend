const AppError = require('../utils/AppError.js');
const commentService = require('../services/commentService.js');

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

module.exports = { createComment, getComments };
