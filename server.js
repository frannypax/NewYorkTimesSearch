var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


var app = express();
var PORT = process.env.PORT || 3001;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));
app.use(express.static("./public"));

var promise = mongoose.connect("mongodb://localhost/nytimes", {
	useMongoClient: true
});

//var db = mongoose.connection;

promise.on("error", function(err){
	console.log("Connection error: ", err)
});
promise.once("openUri", function(){
	console.log("Connection successful")
});

app.get('/', function(req, res){
  res.sendFile('./public/index.html')
});


app.listen(PORT, function(){
	console.log("App listening on port: " + PORT);
})