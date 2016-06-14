var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

var petRoutes = require('./routes/pet_routes')(app);

var server = app.listen(3002, function(){
    console.log("running peter server 3002")
});