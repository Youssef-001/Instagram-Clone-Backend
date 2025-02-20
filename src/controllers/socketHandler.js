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

        socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
            console.log(`Message from ${senderId} to ${receiverId}: ${message}`);
            
            const receiverSocketId = users.get(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('receiveMessage', { senderId, message });

                let senderName = await userService.getProfile(senderId);
                sentNotification(receiverId, 'message', `${senderName.username} sent you a message.`);
            } else {
                console.log(`User ${receiverId} is not online.`);
            }
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

// **Export follow notification function**
const emitFollowNotification = async (followerId, followingId) => {
    if (!ioInstance) {
        console.error('Socket.io instance not initialized.');
        return;
    }

    const followingSocketId = users.get(followingId);

    if (followingSocketId) {
        try {
            const senderName = await userService.getProfile(followerId);

            ioInstance.to(followingSocketId).emit('receiveFollow', {
                message: `${senderName.username} followed you!`
            });

            sentNotification(followingId, 'follow', `${senderName.username} followed you!`);
        } catch (error) {
            console.error('Error fetching follower profile:', error);
        }
    } else {
        console.log(`User ${followingId} is not online, follow notification missed.`);
    }
};

// **Export the function**
module.exports = { socketHandler, emitFollowNotification };
