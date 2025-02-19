const { PrismaClient } = require('@prisma/client');
const AppError = require('../utils/AppError.js');
const prisma = new PrismaClient()



async function createMessage(senderId, receiverId, message)
{
    const newMessage = await prisma.message.create({
        data: {
            senderId: senderId,
            receiverId: receiverId,
            message: message
        }
    });
    
    return newMessage;
}

module.exports = {createMessage}