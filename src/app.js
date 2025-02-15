const express = require('express');
const cors = require('cors'); // Fix incorrect import
const errorHandler = require('./middlewares/errorMiddleware.js');


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));


console.log("Error Handler Type:", typeof errorHandler); 

const authenticationRouter = require('./routes/auth.js')

app.use('/auth', authenticationRouter);



app.use(errorHandler);
app.listen(3000, () => {});