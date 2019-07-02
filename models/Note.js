// Requires mongoose
const mongoose = require('mongoose');

// Creates schema class
const Schema = mongoose.Schema;

// Creates notes schema
const noteSchema = new Schema({

  body: {
    type: String
},
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Headline'
  }
    
});

// Creates our model from the above schema using the mongoose model method
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;