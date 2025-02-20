const userService = require('../services/userService');

const users = new Map(); 

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Store the user's socket ID when they connect
        socket.on('registerUser', (userId) => {
            users.set(userId, socket.id);
            console.log(`User ${userId} registered with socket ID ${socket.id}`);
        });

        // Handle sending direct messages
        socket.on('sendMessage', async({ senderId, receiverId, message }) => {
            console.log(`Message from ${senderId} to ${receiverId}: ${message}`);
            
            const receiverSocketId = users.get(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('receiveMessage', { senderId, message });
                // Send a notification for the new message
                let senderName = await userService.getProfile(senderId);
                sentNotification(receiverId, 'message', `${senderName} sent you a message.`);
            } else {
                console.log(`User ${senderName.username} is not online.`);
            }
        });

        // Handle user following another user
        socket.on('followUser', async({ followerId, followingId }) => {
            console.log(`${followerId} followed ${followingId}`);
            
            const followingSocketId = users.get(followingId);
            if (followingSocketId) {
                io.to(followingSocketId).emit('receiveFollow', {
                    message: `${followerId} followed you!`
                });
                let senderName = await userService.getProfile(followerId);

                sentNotification(followingId, 'follow', `${senderName.username} followed you!`);
            }
        });

        // Handle likes on posts (example)
        socket.on('likePost', async({ userId, postId }) => {
            console.log(`${userId} liked post ${postId}`);
            
            const postOwnerId = getPostOwner(postId); // function to get the post owner
            const postOwnerSocketId = users.get(postOwnerId);
            
            if (postOwnerSocketId) {
                io.to(postOwnerSocketId).emit('receiveLike', {
                    message: `${userId} liked your post!`
                });
                let senderName = await userService.getProfile(userId);

                sentNotification(postOwnerId, 'like', `${senderName.username} liked your post!`);
            }
        });

        // Remove the user from the map when they disconnect
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

// Generic function to send notifications
const sentNotification = (userId, type, message) => {
    const receiverSocketId = users.get(userId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit('notification', { type, message });
    } else {
        console.log(`User ${userId} is not online, notification missed.`);
    }
};

module.exports = socketHandler;
