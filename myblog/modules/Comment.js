var db = require('./mongodb');



var mongoose = db.mongoose,
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var CommentSchema = new Schema({
	Id: {
		type: String,
		unique: true,
		index: true
	},
	ArticleId: {
		type: String,
		required: true
	},
	Content: {
		type: String
	},
	Author: {
		type: String
	},
	PostTime: {
		type: Date
	},
	PostIP: {
		type: String
	}
}, {
	versionKey: false
});

CommentSchema.statics.findComments = function(pagination, cb) {
	var option = {
		sort: {PostTime: -1}
	};

	if(pagination){
		option.skip = ((pagination[0] - 1) * pagination[1]);
		option.limit = pagination[1];
	}

	this.find(null, null, option, function(err, docs){
		if(err){
			cb(err);
			console.log(err);
		}else{
			cb(null, docs);
		}
	});
};

var CommentModel = mongoose.model('comment', CommentSchema);

exports = module.exports = CommentModel;