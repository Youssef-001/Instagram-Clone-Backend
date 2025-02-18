const AppError = require('../utils/AppError.js');
const commentService = require('../services/commentService.js');
async function createComment(req,res,next)
{
    const postId = req.params.postId;
    const content = req.body.content;
    const userId = req.user.userId;
    const parentId = req.query.parentId || null;

    try {
    const comment = await commentService.createComment(postId,userId,parentId, content);
    res.status(200).json({"message": "Comment created successfully", comment})
    
    }

    catch(err)
    {
        throw new AppError(err.message, 400);
    }

}

module.exports = {createComment}