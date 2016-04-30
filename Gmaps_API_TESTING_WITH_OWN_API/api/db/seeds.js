var mongoose = require("mongoose");

var databaseURL    = 'mongodb://localhost:27017/gmaps-api-test-1';
mongoose.connect(databaseURL);

var Package = require("../models/package");

Package.collection.drop();

Package.create([{
  contents: 'Lettuce',
  lat: 51.5241,
  lng: -0.07984,
},{
  contents: 'Cheese',
  lat: 51.5010,
  lng: 0.1416,
}], function(err, packages){
    if(err) return console.error(err);
    mongoose.connection.close();
  });
