var db = require("../models");
var request  = require("request");
var cheerio = require("cheerio");

module.exports = function(app){


	app.get("/scrape", function(req,res){

		console.log("is this working?")
		request("https://techcrunch.com/", function(error,response,html){
			console.log("#2: is this working?")

			result = [];

			var $ = cheerio.load(html);

			$(".river-block .block-content").each(function(i,element){
				

				var title = $(element).children("h2").find("a").text();
				var link = $(element).children("h2").find("a").attr("href");
				var summary = $(element).children("p").text();
				var image = $(element).children("span").find("a").find("img").attr("src");

				// console.log(title);
				// console.log(link);
				// console.log(summary);
				// console.log(image);

				db.Article.create({
					title: title,
					link: link,
					summary: summary,
					image: image
				}).then(function(dbArticle){
					// console.log(dbArticle);
					result.push(dbArticle);
					// res.render("home");
					
				});

			});

			res.send("complete");
		
		});
		
	});


	app.get("/articles", function(req,res){
		db.Article.find({}).then(function(dbArticle){
			res.json(dbArticle);
		});
	});

	app.post("/save", function(req,res){
		var id = req.body.id;
		console.log("this is id: "+id);

		db.Article.find({_id:id}).then(function(dbArticle){

			// console.log(dbArticle);
			// res.send(dbArticle);
			var data = dbArticle[0];

			db.Saved.create({
				title: data.title,
				link: data.link,
				summary: data.summary,
				image: data.image
			}).then(function(){
				res.send("complete");
			});
		});

		
	});

};