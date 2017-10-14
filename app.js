const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const port = process.env.port || 3000;
const app = express();

const index = require('./routes/index');
const song = require('./routes/song');
const songs = require('./routes/songs');

//view engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rocksmithdlc', {useMongoClient: true});

app.use('/', index);
app.use('/song', song);
app.use('/songs', songs);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
