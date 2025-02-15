

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
        const post = await postService.createPost(req.user.id, content, image.filename);
        res.status(200).json(post);
    }
    catch(err)
    {
        next(err);
    }

}

module.exports = {createPost}