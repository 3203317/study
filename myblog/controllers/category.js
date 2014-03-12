var EventProxy = require('eventproxy');
var Category = require('../modules/Category.js');
var Article = require('../modules/Article.js');
var Comment = require('../modules/Comment.js');
var Link = require('../modules/Link.js');


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

	var proxy = EventProxy.create('articles', 'categorys', 'top10ViewNums', 'top10Comments', 'topMarks', 'usefulLinks', function(articles, categorys, top10ViewNums, top10Comments, topMarks, usefulLinks){
		res.render('Category', { 
			moduleName: 'category',
			title: title,
			atitle: categoryName,
			categoryName: categoryName,
			description: '个人博客',
			keywords: ',Bootstrap3',
			virtualPath: virtualPath +'../../',
			topMessage: getTopMessage(),
			articles: articles,
			categorys: categorys,
			top10ViewNums: top10ViewNums,
			top10Comments: top10Comments,
			topMarks: topMarks,
			usefulLinks: usefulLinks
		});
	});

	Category.findCategorys(function(err, docs){
		if(err){
			console.log(err);
		}
		proxy.emit('categorys', docs);
	});

	Article.findArticlesByCategoryName(categoryName, [1, 10], function(err, docs){
		if(err){
			console.log(err);
		}
		proxy.emit('articles', docs);
	});	

	Article.findTop10ViewNums(function(err, docs){
		if(err){
			console.log(err);
		}
		proxy.emit('top10ViewNums', docs);
	});

	Article.findTopMarks(function(err, docs){
		if(err){
			console.log(err);
		}
		proxy.emit('topMarks', docs);
	});

	Comment.findComments([1, 10], function(err, docs){
		if(err){
			console.log(err);
		}
		proxy.emit('top10Comments', docs);
	});

	Link.findLinks(1, function(err, docs){
		if(err){
			console.log(err);
		}
		proxy.emit('usefulLinks', docs);
	});
};

exports.index_more = function(req, res, next) {
	var categoryName = req.params.id.trim();

	try{
		var data = eval('('+ req.query.data +')');

		Article.findArticlesByCategoryName(categoryName, [data.Current, 10], function(err, docs){
			if(err){
				res.send('')
			}else{
				res.render('Category_More', {
					virtualPath: virtualPath +'../../',
					articles: docs
				});					
			}
		});			
	}catch(e){
		res.send('')
		console.log(e)
	}
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