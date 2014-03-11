var EventProxy = require('eventproxy');

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
	var proxy = EventProxy.create('articles', 'categorys', function(articles, categorys){
		res.render('Index', { 
			moduleName: 'index',
			title: title,
			description: '个人博客',
			keywords: ',Bootstrap3',
			virtualPath: virtualPath,
			topMessage: getTopMessage(),
			articles: articles,
			categorys: categorys
		});
	});

	Category.findCategorys(function(err, docs){
		if(err){
			console.log(err);
		}
		proxy.emit('categorys', docs);
	});

	Article.findArticles([1, 10], function(err, docs){
		if(err){
			console.log(err);
		}
		proxy.emit('articles', docs);
	});
};


exports.index_more = function(req, res, next) {
	try{
		var data = eval('('+ req.query.data +')');

		Article.findArticles([data.Current, 10], function(err, docs){
			if(err){
				res.send('')
			}else{
				res.render('Index_More', {
					virtualPath: virtualPath,
					articles: docs
				});					
			}
		});
	}catch(e){
		res.send('');
		console.log(e);
	}
};