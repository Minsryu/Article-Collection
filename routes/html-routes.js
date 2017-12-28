var db = require("../models");

module.exports = function(app){

	app.get("/saved", function(req,res){
		res.render("saved");
	});

	app.get("/", function(req,res){
		res.render("home");
	});

};