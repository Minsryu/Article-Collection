var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");

var PORT = process.env.PORT || 8080;
var app = express();

var db = require("./models");

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.Promise = Promise;

var databaseUri = "mongodb://localhost/article_collection";

if (process.env.MONGODB_URI){
	mongoose.connect(process.env.MONGODB_URI);
}
else{
	mongoose.connect(databaseUri);
}



// mongoose.connect("mongodb://localhost/article_collection", {
//   useMongoClient: true
// });


app.use(express.static("public"));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

app.listen(PORT, function() {

     console.log("App listening on PORT " + PORT);

});

