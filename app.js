const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const port = process.env.port || 3000;
const app = express();

const index = require('./routes/index');
const songs = require('./routes/songs');

//dotenv
require('dotenv').config();

//view engine
app.set('view engine', 'hbs');
app.engine('hbs', require('hbs').__express);
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//method override
app.use(methodOverride('_method'));

//Connect to MongoDB
//mongoose.connect('mongodb://localhost:27017/rocksmithdlc', {useMongoClient: true});
mongoose.connect(process.env.DB_CONNECTION_STRING, {useMongoClient: true});

app.use('/', index);
app.use('/songs', songs);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
