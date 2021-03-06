var EventProxy = require('eventproxy');
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


exports.id = function(req, res, next) {
	var proxy = EventProxy.create('article', 'nextArticle', 'prevArticle', function(article, nextArticle, prevArticle){
		res.render('Article', { 
			moduleName: 'archives',
			title: title,
			atitle: article.ArticleTitle,
			description: '个人博客,' + article.ArticleTitle,
			keywords: (0 === article.ArticleTag.length ? "," : article.ArticleTag) + 'Bootstrap3',
			virtualPath: virtualPath +'../',
			topMessage: getTopMessage(),
			article: article,
			nextArticle: nextArticle,
			prevArticle: prevArticle
		});
	});

	var articleId = req.params.id.trim();

	Article.findArticleById(articleId, function(err, doc){
		if(err){
			console.log(err);
		}
		var article = doc;
		proxy.emit('article', article);

		Article.findNextArticle(article, function(err, doc){
			if(err){
				console.log(err);
			}
			proxy.emit('nextArticle', doc);
		});

		Article.findPrevArticle(article, function(err, doc){
			if(err){
				console.log(err);
			}
			proxy.emit('prevArticle', doc);
		});
	});
};


exports.add = function(req, res, next) {
	var article = new Article();

	Article.saveNew(article, function(err){

		var result = { Success: true };

		if(err) result.Success = false;

		res.send(JSON.stringify(result));
	});
};