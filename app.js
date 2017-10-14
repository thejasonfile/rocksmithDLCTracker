const express = require('express');

const port = process.env.port || 3000;

const app = express();

app.get('/', (req, res, next) => {
  res.send('Hello World');
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
