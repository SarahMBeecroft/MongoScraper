// Imports all models
var db = require('../models');

// Requires express
var express = require('express');
var mongoose = require('mongoose');

// Mongo functions
module.exports = function (app) {

  // Displays home.handlebars at root path
  app.get('/', function (req, res) {
    db.Headline.find({
      'saved': false
    }, function (error, data) {
      var headlineObject = {
        article: data
      };
      res.render('home', headlineObject);
    });
  });

  // Displays saved.handlebars at saved path
  app.get('/saved', function (req, res) {
    db.Headline.find({
      'saved': true
    }).populate('notes').exec(function (error, data) {
      var headlineObject = {
        article: data
      };
      res.render('saved', headlineObject);
    });
  });

  // Route to get all articles
  app.get('/articles', function (req, res) {
    db.Headline.find({}, function (error, doc) {
      if (error) {
        console.log(err);
      }
      // Sends doc to browser
      else {
        res.json(doc);
      }
    });
  });

  // Route to save an article by id
  app.post('/articles/save/:id', function (req, res) {
    db.Headline.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        // Updates boolean value to true
        $set: { saved: true }
      }
    ).then(function (dbHeadline) {
      console.log(dbHeadline);
      res.json(dbHeadline);
    }).catch(function (err) {
      res.writeContinue(err);
    });
  });

  // Route to delete an article by id
  app.post('/articles/delete/:id', function (req, res) {
    db.Headline.deleteOne(
      {
        _id: req.params.id
      }
    ).then(function (response) {
      console.log('The article was deleted!');
      res.end();
    }).catch(function (err) {
      res.writeContinue(err);
    });
  });

// Route to save a note
app.post('/saved/notes/:id', function (req, res) {
  db.Note.create(req.body)
    .then(function (dbNote) {
      return db.Headline.findOneAndUpdate({
        _id: req.params.id
      }, {
          $push: {
            notes: dbNote._id
          }
        }, {
          new: true
        }).populate('notes');
    })
    .then(function (dbHeadline) {
      res.json(dbHeadline);
    })
    .then(function (dbHeadline) {
      res.redirect('back');
    })
    .catch(function (err) {
      res.writeContinue(err);
    });
});

// Route to delete a note
app.post('/notes/delete/:id', function (req, res) {
  db.Note.findByIdAndRemove({ _id: req.params.id })
    .then(function(dbNote) {
      return db.Headline.findOneAndUpdate({
        'notes': req.params.id 
      }, { 
        '$pull': { 'notes': req.params.id } 
      });
    })
    .then(function(dbHeadline) {
      res.redirect('back');
    })
    .catch(function(err) {
      res.writeContinue(err);
    });

  });

}

