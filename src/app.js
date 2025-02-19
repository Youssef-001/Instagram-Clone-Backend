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
app.listen(3000, () => {});