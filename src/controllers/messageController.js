
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

module.exports = {createMessage}