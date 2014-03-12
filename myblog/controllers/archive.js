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

	var proxy = EventProxy.create('categorys', 'top10ViewNums', 'top10Comments', 'usefulLinks', function(categorys, top10ViewNums, top10Comments, usefulLinks){
		res.render('Archive', { 
			moduleName: 'archives',
			title: title,
			atitle: '档案馆',
			description: '个人博客',
			keywords: ',档案馆,Bootstrap3',
			virtualPath: virtualPath +'../',
			topMessage: getTopMessage(),
			categorys: categorys,
			top10ViewNums: top10ViewNums,
			top10Comments: top10Comments,
			usefulLinks: usefulLinks
		});
	});


	Category.findCategorys(function(err, docs){
		if(err){
			console.log(err);
		}
		proxy.emit('categorys', docs);
	});

	Article.findTop10ViewNums(function(err, docs){
		if(err){
			console.log(err);
		}
		proxy.emit('top10ViewNums', docs);
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