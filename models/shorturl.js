const mongoose = require('mongoose');

// Short URL Model Schema
const ShortURLSchema = mongoose.Schema({
  originalURL:{
    type: String
  },
  shortURL:{
    type: String
  }
});

const ShortURL = module.exports = mongoose.model('ShortURL', ShortURLSchema);
