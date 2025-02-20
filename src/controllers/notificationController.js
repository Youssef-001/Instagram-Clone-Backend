
const AppError = require('../utils/AppError');


async function createNotification(req,res,next) 
{

    const receiverId = req.params.receiverId;
    const notificationType = req.body.type;

    if (!notificationType)
    {
        return next(new AppError('Notification type is required', 400));
    }

    if (notificationType != "LIKE" && notificationType != "FOLLOW" && notificationType != "COMMENT" && notificationType != "MESSAGE")
    {
        return next(new AppError('Not valid notification type', 400));
    }

    const notification = await notificationService.createNotification(req.user.id, receiverId, notificationType);

    res.status(201).json({
        status: 'success',
        data: {
            notification
        }
    });

}

module.exports = {createNotification}