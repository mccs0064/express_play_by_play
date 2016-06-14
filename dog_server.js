var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dogs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var dogs = require('./routes/dog_routes')(app);

var server = app.listen(3001, () => console.log("running dog server 3001"));