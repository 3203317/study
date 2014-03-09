
var Category = require('../modules/Category.js');

var Article = require('../modules/Article.js');

module.exports = function(app) {

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

	var virtualPath = '';
	var title = 'FOREWORLD 洪荒';

	/**
	 * 404
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	 */
	app.use(function (req, res) {
		res.render('404');
	});

	var indexUI = function (req, res) {
		Article.findArticles([1,10], function(err, rows){			
			res.render('Index', { 
				moduleName: 'index',
				title: title,
				description: '个人博客',
				keywords: ',Bootstrap3',
				virtualPath: virtualPath,
				topMessage: getTopMessage(),
				articles: rows
			});
		});
	};

	/**
	 * 首页
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	 */
	app.get('/index.html', indexUI);
	app.get('/', indexUI);

	/**
	 * 首页更多
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	 */
	app.get('/index/more', function (req, res) {
		var data = eval('('+ req.query.data +')');

		Article.findArticles([data.Current,10], function(err, rows){
			res.render('Index_More', {
				virtualPath: virtualPath,
				articles: rows
			});
		});
	});

	/**
	 * 分类
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	 */
	app.get('/archive/category/:id', function (req, res) {
		var categoryName = req.params.id;

		Article.findArticlesByCategoryName(categoryName, [1,10], function(err, rows){			
			res.render('Category', { 
				moduleName: 'category',
				title: title,
				atitle: categoryName,
				categoryName: categoryName,
				description: '个人博客',
				keywords: ',Bootstrap3',
				virtualPath: virtualPath +'../../',
				topMessage: getTopMessage(),
				articles: rows
			});
		});
	});

	/**
	 * 分类更多
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	 */
	app.get('/archive/category/:id/more', function (req, res) {
		var data = eval('('+ req.query.data +')');
		var categoryName = req.params.id;

		Article.findArticlesByCategoryName(categoryName, [data.Current,10], function(err, rows){			
			res.render('Category_More', {
				virtualPath: virtualPath +'../../',
				articles: rows
			});
		});
	});

	/**
	 * 登陆
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	 */
	app.get('/user/login', function (req, res) {
		res.render('User/Login', { 
			title: title,
			atitle: '登陆',
			description: '个人博客',
			keywords: ',登陆,Bootstrap3',
			virtualPath: virtualPath +'/'
		});
	});

	/**
	 * 档案馆 
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	 */
	app.get('/archive/', function (req, res) {
		res.render('Archive', { 
			moduleName: 'archives',
			title: title,
			atitle: '档案馆',
			description: '个人博客',
			keywords: ',档案馆,Bootstrap3',
			virtualPath: virtualPath +'../',
			topMessage: getTopMessage()
		});
	});

	/**
	 * 标签馆
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	 */
	app.get('/archive/tag/', function (req, res) {
		res.render('Tags', { 
			moduleName: 'tag',
			title: title,
			atitle: '标签',
			description: '个人博客',
			keywords: ',标签,Bootstrap3',
			virtualPath: virtualPath +'../../',
			topMessage: getTopMessage()
		});
	});

	/**
	 * 标签模块
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	 */
	app.get('/archive/tag/:id', function (req, res) {
		var tagName = req.params.id;

		Article.findArticlesByTagName(tagName, [1,10], function(err, rows){			
			res.render('Tag', { 
				moduleName: 'tag',
				title: title,
				atitle: tagName,
				tagName: tagName,
				description: '个人博客',
				keywords: ',标签,Bootstrap3',
				virtualPath: virtualPath +'../../',
				topMessage: getTopMessage(),
				articles: rows
			});
		});
	});

	/**
	 * 标签更多
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	 */
	app.get('/archive/tag/:id/more', function (req, res) {
		var data = eval('('+ req.query.data +')');

		var tagName = req.params.id;

		Article.findArticlesByTagName(tagName, [data.Current,10], function(err, rows){
			res.render('Tag_More', {
				virtualPath: virtualPath +'../../',
				articles: rows
			});
		});
	});

	/**
	 * 文章
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	 */
	app.get('/archive/:id.html', function (req, res) {
		var articleId = req.params.id;

		Article.findArticleById(articleId, function(err, rows){
			var article = rows;

			res.render('Article', { 
				moduleName: 'archives',
				title: title,
				atitle: article.ArticleTitle,
				description: '个人博客,' + article.ArticleTitle,
				keywords: ',Bootstrap3',
				virtualPath: virtualPath +'../',
				topMessage: getTopMessage(),
				article: article
			});
		});
	});

	/**
	 * 添加新文章
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	 */
	app.get('/article/add.do', function (req, res) {

		var article = new Article();

		Article.saveNew(article, function(err){

			var result = { Success: true };

			if(err) result.Success = false;

			res.send(JSON.stringify(result));
		});
	});
};