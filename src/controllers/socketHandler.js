const userService = require('../services/userService');

const users = new Map();
let ioInstance; // Store io instance

const socketHandler = (io) => {
    ioInstance = io; // Save io instance

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('registerUser', (userId) => {
            users.set(userId, socket.id);
            console.log(`User ${userId} registered with socket ID ${socket.id}`);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            users.forEach((socketId, userId) => {
                if (socketId === socket.id) {
                    users.delete(userId);
                }
            });
        });
    });
};

// **Generalized notification function**
const sendNotification = async (receiverId, type, senderId, extraData = {}) => {
    if (!ioInstance) {
        console.error('Socket.io instance not initialized.');
        return;
    }

    const receiverSocketId = users.get(receiverId);
    if (!receiverSocketId) {
        console.log(`User ${receiverId} is not online, notification missed.`);
        return;
    }

    try {
        const senderProfile = await userService.getProfile(senderId);
        const message = generateNotificationMessage(type, senderProfile.username, extraData);

        ioInstance.to(receiverSocketId).emit('notification', { type, message });
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

// **Helper function to generate notification messages**
const generateNotificationMessage = (type, senderName, extraData) => {
    switch (type) {
        case 'follow':
            return `${senderName} followed you!`;
        case 'like':
            return `${senderName} liked your post!`;
        case 'message':
            return `${senderName} sent you a message: "${extraData.message}"`;
        default:
            return `${senderName} sent you a notification.`;
    }
};

// **Export functions**
module.exports = { socketHandler, sendNotification };
