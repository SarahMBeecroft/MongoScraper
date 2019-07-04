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

// Use body-parser for handling form submissions
app.use(bodyparser.urlencoded({ extended: true }));

// Requires app js files
require('./controllers/scrape.js')(app);
require('./controllers/headlines.js')(app);
require('./controllers/notes.js')(app);

// Uses express.static to serve the public folder as static directory
app.use(express.static(__dirname + '/public'));

// Sets up handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main',
partialsDir: __dirname+ '/views/layouts/partials'
}));
app.set('view engine', 'handlebars');

// If deployed, uses deployed db, otherwise uses local mongoHeadlines db
var db = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

// Connects mongoose to db
mongoose.connect(db, { useNewUrlParser: true }, function(error) {
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


