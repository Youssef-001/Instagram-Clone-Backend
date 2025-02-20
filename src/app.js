// app.js
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorMiddleware.js');
const path = require('path');
const authenticationRouter = require('./routes/auth.js');
const postsRouter = require('./routes/posts.js');
const followRouter = require('./routes/follow.js');
const messageRouter = require('./routes/messages.js');
const usersRouter = require('./routes/users.js');
const passport = require('passport');
const session = require('express-session');
const http = require('http');
const { Server } = require('socket.io');

const {socketHandler} = require('./controllers/socketHandler.js'); // Import socket handler

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
app.use('/users', usersRouter);
app.use(errorHandler);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

// Call the socketHandler function to initialize sockets
socketHandler(io);

server.listen(3000, () => {
    console.log('listening on *:3000');
});

module.exports = io;
