// Require packages
var express        = require('express');
var cors           = require('cors');
var bodyParser     = require('body-parser');
var morgan         = require('morgan');
var mongoose       = require('mongoose');
var app            = express();

// Setup database
var databaseURL    = 'mongodb://localhost/gmaps-api-test-1';

// Connect to database
mongoose.connect(databaseURL);

// Require routes
var routes         = require('./config/routes');

// Setup Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

// Listen on the correct PORT
app.listen(process.env.PORT || 3000);
console.log("Express is alive and listening on port 3000");
