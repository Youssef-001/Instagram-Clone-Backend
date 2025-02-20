const express = require('express');
const cors = require('cors'); // Fix incorrect import
const errorHandler = require('./middlewares/errorMiddleware.js');
const path = require('path');
const authenticationRouter = require('./routes/auth.js')
const postsRouter = require('./routes/posts.js');
const followRouter = require('./routes/follow.js');
const messageRouter = require('./routes/messages.js')
const passport = require('passport');
const session = require('express-session');
const http = require('http');
const { Server } = require('socket.io');


const app = express();
app.use(session({'secret':'cats'}));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));




app.use('/auth', authenticationRouter);
app.use('/posts', postsRouter);
app.use('/follow', followRouter);
app.use('/messages', messageRouter);
app.use(errorHandler);


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});


const users = new Map(); // Store userId -> socketId mapping

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Store the user's socket ID when they connect
    socket.on('registerUser', (userId) => {
        users.set(userId, socket.id);
        console.log(`User ${userId} registered with socket ID ${socket.id}`);
    });

    // Handle sending direct messages
    socket.on('sendMessage', ({ senderId, receiverId, message }) => {
        console.log(`Message from ${senderId} to ${receiverId}: ${message}`);
        

        const receiverSocketId = users.get(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('receiveMessage', { senderId, message });
        } else {
            console.log(`User ${receiverId} is not online.`);
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




server.listen(3000, () => {
    console.log('listening on *:3000');
});

// app.listen(3000, () => {});

module.exports = io;