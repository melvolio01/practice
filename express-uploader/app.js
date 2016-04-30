var express = require('express');
var morgan = require('morgan');
var PORT = process.env.PORT || 3000;
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// 2 routes files, one for the API, one for the frontend
var apiRoutes = require('./config/routes/api');
var frontendRoutes = require('./config/routes/frontend');

mongoose.connect('mongodb://localhost/express-uploader');

// set up static views for index.html
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// hook up thre routes
app.use('/api', apiRoutes);
app.get('/', frontendRoutes);

app.listen(PORT, function() {
  console.log("Express is listening on port " + PORT);
});