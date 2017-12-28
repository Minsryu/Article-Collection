var mongoose = require("mongoose");

 var Schema = mongoose.Schema;

 var SavedSchema = new Schema({

 	title:{
 		type: String,
 		require: true
 	},

 	link: {
 		type: String,
 		require: true
 	},
 	summary: {
 		type: String,
 		require: true
 	},
 	image: {
 		type: String,
 		require: true
 	},
 	notes:[
 		{
 			type: Schema.Types.ObjectId,
 			ref:"Note"
 		}
	]
 	
 });

 var Saved = mongoose.model("Saved", SavedSchema);

 module.exports = Saved;