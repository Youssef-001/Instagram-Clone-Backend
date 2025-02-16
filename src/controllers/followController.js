const followService = require('../services/followService');

async function followUser(req,res,next)
{
    const senderId = req.params.senderId;
    const receiverId = req.params.receiverId;
    try {
        const follow = await followService.followUser(senderId, receiverId);
        res.status(200).json(follow);
    }
    catch(err)
    {
        next(err);
    }
}

async function unfollowUser(req,res,next)
{
    const senderId = req.params.senderId;
    const receiverId = req.params.receiverId;
    try {
        const follow = await followService.unfollowUser(senderId, receiverId);
        res.status(200).json(follow);
    }
    catch(err)
    {
        next(err);
    }
}

module.exports = {followUser,unfollowUser}