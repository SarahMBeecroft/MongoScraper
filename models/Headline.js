// Requires mongoose
const mongoose = require('mongoose');

// Creates schema class
const Schema = mongoose.Schema;

// Creates headline schema
const headlineSchema = new Schema({
  title: {
    type: String,
  },
  summary: {
    type: String,
  },
  link: {
    type: String,
    unique: true 
  },
  saved: {
    type: Boolean,
    default: false
  },
  notes: [{
     type: Schema.Types.ObjectId,
     ref: 'Note'
  }]
});

// Create the headline model
const Headline = mongoose.model('Headline', headlineSchema);

// Exports the model
module.exports = Headline;