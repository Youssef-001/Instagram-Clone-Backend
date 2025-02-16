

const AppError = require('../utils/AppError.js');
const postService = require('../services/postService.js');
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

module.exports = {createPost, getUserPosts}