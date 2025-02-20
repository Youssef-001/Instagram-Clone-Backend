
const AppError = require('../utils/AppError');
const messageService = require('../services/messageService');

async function createMessage(req,res,next)
{
    const {senderId, receiverId} = req.params;
    const message = req.body.message;

    if (!message)
    {
        return next(new AppError("Message cannot be empty", 400));
    }

    try {
        const newMessage = await messageService.createMessage(senderId, receiverId, message);
        res.status(201).json({
            status: 'success',
            data: {
                message: newMessage
            }
        });
    }

    catch(err)
    {
        next(new AppError(err.message, 400));

    }

}


async function getMessages(req,res,next)
{
    const {user1, user2} = req.params;

    try {
        const messages = await messageService.getMessages(user1, user2);
        res.status(200).json({
            status: 'success',
            data: {
                messages: messages
            }
        });
    }

    catch(err)
    {
        next(new AppError(err.message, 400));
    }
}

async function deleteMessage(req,res,next)
{
    const {messageId} = req.params;
    const senderId = req.query.senderId;

    if (senderId != req.user.id)
    {
        return next(new AppError("You are not authorized to delete this message", 401));
    }

    try {
        await messageService.deleteMessage(senderId, messageId);
        res.status(204).json({
            status: 'success',
        });
    }

    catch(err)
    {
        next(new AppError(err.message, 400));
    }
}

module.exports = {createMessage, getMessages, deleteMessage}