var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cats');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var cats = require('./routes/cat_routes')(app);

var server = app.listen(3000, () => console.log("running cat server 3000"));