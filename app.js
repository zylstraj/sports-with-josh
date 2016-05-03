'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/db');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

let router = express.Router();
require(__dirname + '/routes/userRoutes')(router);
require(__dirname + '/routes/blogroutes')(router);
require(__dirname + '/routes/loginRoutes')(router);
require(__dirname + '/routes/search-routes')(router);
require(__dirname + '/routes/keyword-route')(router);
app.use('/', router);

app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
  console.log('Server listening on port ' + (port || 3000));
});
