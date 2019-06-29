// NPM Packages 
var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var axios = require('axios');
var cheerio = require('cheerio');
var bodyparser = require('body-parser');

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';