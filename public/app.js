$(document).ready(function() {


	$("#scrape").on("click",function(){
		console.log("this worked");
		$.ajax({
			method:"GET",
			url: "/scrape"
		}).done(function(data){
			console.log("do something with data");

			$.getJSON("/articles",function(data){
				for(var i=0;i <data.length;i++){

				//pannel div
				var pannel = $("<div>");
				pannel.addClass("panel panel-default")

				//pannel title and button
				var newDiv = $("<div>");
				newDiv.addClass("panel-heading");
				newDiv.attr("href",data[i].link);


				var h3 = $("<h2>");
				h3.addClass("panel-title");
				h3.append(data[i].title);

				var btn = $("<button>");
				btn.addClass("btn btn-default pull-right save-btn");
				btn.attr("id",data[i]._id);
				btn.append("Save");

				var newDiv2 = $("<div>");
				newDiv2.addClass("clearfix");

				newDiv.append(h3, btn, newDiv2);

				//pannel summary
				var newDiv3 = $("<div>");
				newDiv3.addClass("panel-body");
				newDiv3.append(data[i].summary);

				//putting title and content on single pannel

				pannel.append(newDiv, newDiv3);

				// pannel.append(newDiv);

				$("#home-article").append(pannel);

				}
			});

		});
	});

	$("body").on("click",".save-btn", function(){
		var id = $(this).attr("id");
		console.log("clicked!!");
		$.ajax({
			method:"POST",
			url:"/save",
			data: { id: id}
		}).done(function(data){
			console.log(data);
		});
	});


});

