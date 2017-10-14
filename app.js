const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const port = process.env.port || 3000;
const app = express();

const index = require('./routes/index');

//view engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Connect to MongoDB
MongoClient.connect('mongodb://localhost:27017/rocksmithDLC', (err, db) => {
  if(err) throw err;
  console.log("Connected successfully to mongodb server");

  db.close();
});

app.use('/', index);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
