const express = require('express');
const cors = require('cors'); // Fix incorrect import
const errorHandler = require('./middlewares/errorMiddleware.js');
const path = require('path');
const authenticationRouter = require('./routes/auth.js')
const postsRouter = require('./routes/posts.js');
const session = require('express-session');
const passport = require('passport');



const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({secret:'cats'}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


console.log("Error Handler Type:", typeof errorHandler); 


app.use('/auth', authenticationRouter);
app.use('/posts', postsRouter);




app.use(errorHandler);
app.listen(3000, () => {});