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
	res.render('Tags', { 
		moduleName: 'tag',
		title: title,
		atitle: '标签',
		description: '个人博客',
		keywords: ',标签,Bootstrap3',
		virtualPath: virtualPath +'../../',
		topMessage: getTopMessage()
	});
};


exports.id = function(req, res, next) {
	var tagName = req.params.id.trim();

	Article.findArticlesByTagName(tagName, [1,10], function(err, docs){
		if(err){
			next(err);
			return;
		}

		res.render('Tag', { 
			moduleName: 'tag',
			title: title,
			atitle: tagName,
			tagName: tagName,
			description: '个人博客',
			keywords: ',标签,Bootstrap3',
			virtualPath: virtualPath +'../../',
			topMessage: getTopMessage(),
			articles: docs
		});
	});
};

exports.id_more = function(req, res, next) {
	var tagName = req.params.id.trim(),
		data;

	try{
		data = eval('('+ req.query.data +')');
	}catch(e){
		res.send('')
		return;
	}

	Article.findArticlesByTagName(tagName, [data.Current, 10], function(err, docs){
		if(err){
			res.send('');
			return;
		}

		res.render('Tag_More', {
			virtualPath: virtualPath +'../../',
			articles: docs
		});
	});
};