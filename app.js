const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');

var MongoClient = mongodb.MongoClient;

// Connect to the DB
export MONGOLAB_URI = "mongodb://username:password@ds01316.mlab.com:1316/hemakshis-shorturl"
var url = process.env.MONGOLAB_URI;
MongoClient.connect(url, function(err, db){
  if(err){
    console.log('Unable to connect to the database');
  } else {
    console.log('Connection established to ' + url);
  }
});

// Init App
var app = express();

// Bring in ShortURL Model
let ShortURL = require('./models/shorturl');

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Port Number
const port = process.env.PORT || 8080;

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Home Route
app.get('/', function(req, res){
  res.render('index');
});

// Route Files
let api = require('./routes/api');
app.use('/', api);

// Start Server
app.listen(port, function(){
  console.log('Server started on port 3000...');
});
