var Category = require('../modules/Category.js');
var Article = require('../modules/Article.js');

var virtualPath = '';
var title = 'FOREWORLD 洪荒';

/**
 * 日期小于10补0
 */
function p(s) {
	return 10 > s ? '0' + s : s;
}

function getTopMessage(){
	var time = new Date();
	var year = time.getFullYear();
	var month = p(time.getMonth() + 1);
	var day = p(time.getDate());

	return '欢迎您。今天是'+ year +'年'+ month +'月'+ day +'日。';
};

exports.index = function(req, res, next) {	
	var categoryName = req.params.id.trim();

	Article.findArticlesByCategoryName(categoryName, [1, 10], function(err, docs){
		if(err){
			next(err);
			return;
		}

		res.render('Category', { 
			moduleName: 'category',
			title: title,
			atitle: categoryName,
			categoryName: categoryName,
			description: '个人博客',
			keywords: ',Bootstrap3',
			virtualPath: virtualPath +'../../',
			topMessage: getTopMessage(),
			articles: docs
		});
	});	
};

exports.index_more = function(req, res, next) {
	var categoryName = req.params.id.trim(),
		data;

	try{
		data = eval('('+ req.query.data +')');
	}catch(e){
		res.send('')
		return;
	}

	Article.findArticlesByCategoryName(categoryName, [data.Current, 10], function(err, docs){
		if(err){
			res.send('')
			return;
		}

		res.render('Category_More', {
			virtualPath: virtualPath +'../../',
			articles: docs
		});
	});
};


exports.add = function(req, res, next) {
	var category = {
		CategoryName: 'haha',
		CategoryOrder: 1,
		CategoryIntro: '',
		CategoryCount: 1
	};

	Category.saveNew(category, function(err, doc){
		var result = { Success: true };

		if(err) {
			result.Success = false;
			result.err = err;
		}else{
			result.data = doc;
		}

		res.send(JSON.stringify(result));
	});	
};