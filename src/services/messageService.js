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


async function getMessages(user1, user2) {
    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: user1, receiverId: user2 },
                    { senderId: user2, receiverId: user1 }
                ]
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true
                    }
                },
                receiver: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true
                    }
                }
            },
            orderBy: {
                createdAt: 'asc' // Ensures messages are sorted by time
            }
        });

        return messages;
    } catch (error) {
        throw new AppError('Error fetching messages', 500);
    }
}


module.exports = {createMessage, getMessages}