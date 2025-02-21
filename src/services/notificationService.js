
const { PrismaClient } = require('@prisma/client');
const AppError = require('../utils/AppError.js');
const prisma = new PrismaClient()


async function createNotification(senderId, receiverId, notificationType, target)
{

    let notification = await prisma.notification.create({
        data: {
            userId: receiverId,
            senderId: senderId,
            type: notificationType,
            targetId: target
        }
    })

    return notification;

}


module.exports = {createNotification};