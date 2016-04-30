var mongoose = require('mongoose');

var packageSchema = mongoose.Schema({
  contents: String,
  lat: Number,
  lng: Number,
});

module.exports = mongoose.model('Package', packageSchema);
