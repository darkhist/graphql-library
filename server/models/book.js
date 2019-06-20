const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  // remember, mongoDB creates unique ID's for items
  // in collections – so we don't need to declare one
  title: String,
  genre: String,
  authorID: Number
});

// A model represents a collection
// and we want to create a new collection based on the schema above
module.exports = mongoose.model('Books', BookSchema);