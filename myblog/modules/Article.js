var db = require('./mongodb');

var Schema = db.mongoose.Schema,
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
	}
}, {
	versionKey: false
});

db.mongoose.model('article', ArticleSchema);

var Article = db.mongoose.model('article');

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