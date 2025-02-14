const express = require('express');
const cors = require('cors'); // Fix incorrect import
const errorHandler = require('./middlewares/errorMiddleware.js');


const app = express();
app.use(cors());


console.log("Error Handler Type:", typeof errorHandler); // Should print "function"

const authenticationRouter = require('./routes/auth.js')

app.use('/auth', authenticationRouter);



app.use(errorHandler);
app.listen(3000, () => {});