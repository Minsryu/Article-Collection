var db = require("../models");

module.exports = function(app){

	app.get("/saved", function(req,res){
		
		db.Saved.find({}).then(function(dbArticle){
			
			var hbsObject = {
				articles: dbArticle
			}
			console.log(dbArticle);
			res.render("saved", hbsObject);

		});

		
	});

	app.get("/", function(req,res){
		res.render("home");
	});

};