const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require('./middlewares/errorMiddleware.ts');
app.use(cors());


console.log("Error Handler Type:", typeof errorHandler); // Should print "function"


const authenticationRouter = require('./routes/auth.ts')

app.use('/auth', authenticationRouter);

app.get('/', (req: any, res: any) => {
  res.send('Hello World!');
});



app.use(errorHandler);
app.listen(3000, () => {});