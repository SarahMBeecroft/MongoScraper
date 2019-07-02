// Imports all models
var db = require('../models');

// Requires express
var express = require('express');

// Notes functions
module.exports = function (app) {

  // Gets article by object id
  app.get('/articles/:id', function (req, res) {
    db.Headline.findOne({
        '_id': req.params.id
      })
      // Populate will show any associated notes
      .populate('note')
      .then(function (error, doc) {
        if (error) {
          console.log(error);
        }
        // Sends doc to browser
        else {
          res.json(doc);
        }
    });
  });

  // Route to create a new note
  app.post('/notes/save/:id', function (req, res) {
    var newNote = new db.Note({
      body: req.body.text,
      article: req.params.id
    });
    console.log(req.body)
    // Saves new note to db
    newNote.save(function (error, note) {
      if (error) {
        console.log(error);
      }
      else {
        // Updates note in db
        db.Headline.findOneAndUpdate({
            '_id': req.params.id
          }, {
            $push: {
              'notes': note
            }
          })
          .then(function (err) {
            if (err) {
              console.log(err);
            } else {
              // Sends note to browser
              res.send(note);
            }
        });
      }
    });
  });

  // Route to delete a note
  app.delete('/notes/delete/:note_id/:article_id', function (req, res) {
    db.Note.findOneAndRemove({
      '_id': req.params.note_id
    }, function (err) {
      if (err) {
        console.log(err);
      } else {
        db.Headline.findOneAndUpdate({
            '_id': req.params.article_id
          }, {
            $pull: {
              'notes': req.params.note_id
            }
          })
          .then(function (err) {
            if (err) {
              console.log(err);
            } else {
               // Sends confirmation to browser
              res.send('The note was deleted');
            }
          });
        }
    });
  });
}