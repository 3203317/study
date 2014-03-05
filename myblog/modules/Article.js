var db = require('./mongodb');

var mongoose = db.mongoose,
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var ArticleSchema = new Schema({
	Id: {
		type: String,
		unique: true,
		index: true
	},
	CategoryId: {
		type: String
	},
	ArticleTitle: {
		type: String
	},
	ArticleIntro: {
		type: String
	},
	ArticleAuthor: {
		type: String
	},
	ArticleContent: {
		type: String
	},
	PostTime: {
		type: Date
	},
	ViewNums: {
		type: String
	},
	ArticleTag: {
		type: String
	},
	Bookmark: {
		type: String
	},
	TopMark: {
		type: String
	},
	ArticleImage: {
		type: String
	}
}, {
	versionKey: false
});

mongoose.model('article', ArticleSchema);

var Article = mongoose.model('article');

Article.findArticles = function(pagination, cb) {
	Article.find(null, null, {sort: {PostTime: -1}, skip: pagination[0], limit: pagination[1]}, function(err, docs){
		if(err){
			cb(err);
		}else{
			cb(null, docs);
		}
	});
};

exports = module.exports = Article;