var db = require('./mongodb');

var Category = require('./Category');

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
		type: Number
	},
	ArticleTag: {
		type: String
	},
	Bookmark: {
		type: Number
	},
	TopMark: {
		type: Number
	},
	ArticleImage: {
		type: String
	}
}, {
	versionKey: false
});

ArticleSchema.virtual('ViewNumsToFormat').get(function(){
	return threeSeparator(this.ViewNums);
});

ArticleSchema.virtual('PostTime_Year').get(function(){
	return this.PostTime.getFullYear()
});

ArticleSchema.virtual('PostTime_Month').get(function(){
	return p(this.PostTime.getMonth()+1)
});

ArticleSchema.virtual('PostTime_Day').get(function(){
	return p(this.PostTime.getDate())
});

ArticleSchema.virtual('PostTime_Date').get(function(){
	return this.PostTime.getFullYear() +'-'+ p(this.PostTime.getMonth()+1) +'-'+ p(this.PostTime.getDate())
});

ArticleSchema.virtual('Tags').get(function(){
	var str = this.ArticleTag;
	if(0 === str.length) return '';

	var strs = str.split(',');

	var result = [];

	for(var s in strs){
		if('' !== strs[s]) result.push({'TagName': strs[s]});
	}

	return result;
});



/**
 * 日期小于10补0
 **/
function p(s) {
	return 10 > s ? '0' + s : s;
}


function threeSeparator(num) {
	num = num + "";
	var re = /(-?\d+)(\d{3})/;
	while (re.test(num)) {
		num = num.replace(re, "$1,$2");
	}
	return num;
}

mongoose.model('article', ArticleSchema);

var Article = mongoose.model('article');

Article.findArticles = function(pagination, cb) {
	Article.find(null, null, {sort: {PostTime: -1}, skip: ((pagination[0] - 1) * pagination[1]), limit: pagination[1]}, function(err, docs){
		if(err){
			cb(err);
		}else{
			cb(null, docs);
		}
	});
};

Article.findArticlesByTagName = function(tagName, pagination, cb) {
	if ('' === tagName) {
		cb('请求参数异常');
	};

	var params = {
		ArticleTag: new RegExp(','+ tagName +',', 'i')
	};

	Article.find(params, null, {sort: {PostTime: -1}, skip: ((pagination[0] - 1) * pagination[1]), limit: pagination[1]}, function(err, docs){
		if(err){
			cb(err);
		}else{
			cb(null, docs);
		}
	});
};

Article.findArticlesByCategoryName = function(categoryName, pagination, cb) {

	Category.findCategoryByName(categoryName, function(err, doc){
		if(err){
			cb(err);
		}else{
			Article.find({CategoryId: doc.Id}, null, {sort: {PostTime: -1}, skip: ((pagination[0] - 1) * pagination[1]), limit: pagination[1]}, function(err, docs){
				if(err){
					cb(err);
				}else{
					cb(null, docs);
				}
			});
		}
	});
};

Article.findArticleById = function(articleId, cb) {
	Article.findOne({Id: articleId}, null, null, function(err, docs){
		if(err){
			cb(err);
		}else{
			cb(null, docs);
		}
	});
};

exports = module.exports = Article;