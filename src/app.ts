const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


app.get('/', (req: any, res: any) => {
  res.send('Hello World!');
});


app.listen(3000, () => {});