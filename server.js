// NPM Packages 
var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var axios = require('axios');
var cheerio = require('cheerio');
var bodyparser = require('body-parser');




// Sets up port to host's designated port or 3000
var PORT = process.env.PORT || 3000;

// Sets up express app
var app = express();

// Sets up an express router
var router = express.Router();

// Designates our public folder as a static directory
app.use(express.static(__dirname + '/public'));

// Connects handlebars to express app
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Sets up body parser
app.use(bodyparser.urlencoded({
  extended: false
}));

// Sets up requests to go through router middleware
app.use(router);

// If deployed, uses deployed db, otherwise uses local mongoHeadlines db
var db = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

// Connects mongoose to db
mongoose.connect(db, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log('Mongoose connection is successful');
  }
});

// Listens on port
app.listen(PORT, function() {
  console.log('Listening on port:' + PORT);
});


