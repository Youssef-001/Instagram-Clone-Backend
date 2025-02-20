const followService = require('../services/followService');
const { sendNotification } = require('../controllers/socketHandler');

async function followUser(req, res, next) {
    const senderId = req.params.senderId;
    const receiverId = req.params.receiverId;
    
    try {
        const follow = await followService.followUser(senderId, receiverId);
        
        // Send follow notification
        sendNotification(receiverId, 'follow', senderId);

        res.status(200).json(follow);
    } catch (err) {
        next(err);
    }
}

async function unfollowUser(req, res, next) {
    const senderId = req.params.senderId;
    const receiverId = req.params.receiverId;
    
    try {
        const follow = await followService.unfollowUser(senderId, receiverId);
        res.status(200).json(follow);
    } catch (err) {
        next(err);
    }
}

module.exports = { followUser, unfollowUser };
