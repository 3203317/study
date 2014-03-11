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
	num = num + '';
	var re = /(-?\d+)(\d{3})/;
	while (re.test(num)) {
		num = num.replace(re, '$1,$2');
	}
	return num;
}

ArticleSchema.statics.findArticles = function(pagination, cb) {
	pagination[0] = pagination[0] || 1;

	this.find(null, null, {sort: {PostTime: -1}, skip: ((pagination[0] - 1) * pagination[1]), limit: pagination[1]}, function(err, docs){
		if(err){
			cb(err);
			console.log(err);
		}else{
			cb(null, docs);
		}
	});
};

ArticleSchema.statics.findArticlesByTagName = function(tagName, pagination, cb) {
	var params = {
		ArticleTag: new RegExp(','+ tagName +',', 'i')
	};
	pagination[0] = pagination[0] || 1;

	this.find(params, null, {sort: {PostTime: -1}, skip: ((pagination[0] - 1) * pagination[1]), limit: pagination[1]}, function(err, docs){
		if(err){
			cb(err);
			console.log(err);
		}else{
			cb(null, docs);
		}
	});
};

ArticleSchema.statics._findArticlesByCategoryId = function(categoryId, pagination, cb) {
	this.find({CategoryId: categoryId}, null, {sort: {PostTime: -1}, skip: ((pagination[0] - 1) * pagination[1]), limit: pagination[1]}, function(err, docs){
		if(err){
			cb(err);
			console.log(err);
		}else{
			cb(null, docs);
		}
	});
};

ArticleSchema.statics.findArticlesByCategoryName = function(categoryName, pagination, cb) {
	var that = this;
	pagination[0] = pagination[0] || 1;

	Category.findCategoryByName(categoryName, function(err, doc){
		if(err){
			cb(err);
			console.log(err);
		}else{
			if(doc){
				that._findArticlesByCategoryId(doc.Id, pagination, cb);
			}else{
				cb('Not found');
			}
		}
	});
};

ArticleSchema.statics.findArticleById = function(articleId, cb) {
	this.findOne({Id: articleId}, null, null, function(err, doc){
		if(err){
			cb(err);
			console.log(err);
		}else{
			if(doc){
				cb(null, doc);
			}else{
				cb('Not found')
			}
		}
	});
};

ArticleSchema.statics.findPrevArticle = function(article, cb) {
	this.findOne({PostTime: { $gt: article.PostTime }}, null, {sort: {PostTime: 1}}, function(err, doc){
		if(err){
			cb(err);
			console.log(err);
		}else{
			cb(null, doc);
		}
	});
};

ArticleSchema.statics.findNextArticle = function(article, cb) {
	this.findOne({PostTime: { $lt: article.PostTime }}, null, {sort: {PostTime: -1}}, function(err, doc){
		if(err){
			cb(err);
			console.log(err);
		}else{
			cb(null, doc);
		}
	});
};


/**
 * 保存新文章
 *
 * @method
 * @params req
 * @params res
 * @return
 */
ArticleSchema.statics.saveNew = function(article, cb) {
	console.log(article);

	var err;
	cb(err);
};

exports = module.exports = mongoose.model('article', ArticleSchema);