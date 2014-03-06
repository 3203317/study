
var Category = require('../modules/Category.js');

var Article = require('../modules/Article.js'),
	article = new Article();

module.exports = function(app) {

	/**
	 * 404
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	*/
	app.use(function (req, res) {
		res.render("404");
	});

	var indexUI = function (req, res) {
		var time = new Date();
		var year = time.getFullYear();
		var month = p(time.getMonth() + 1);
		var day = p(time.getDate());

		Article.findArticles([1,10], function(err, rows){			
			res.render('Index', { 
				moduleName: 'index',
				title: 'FOREWORLD 洪荒',
				description: '个人博客',
				keywords: ',Bootstrap3',
				virtualPath: '',
				topMessage: '欢迎您。今天是'+ year +'年'+ month +'月'+ day +'日。',
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
				virtualPath: '',
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
	app.get('/archive/category/*', function (req, res) {
		var time = new Date();
		var year = time.getFullYear();
		var month = p(time.getMonth() + 1);
		var day = p(time.getDate());

		Article.findArticles([1,10], function(err, rows){			
			res.render('Category', { 
				moduleName: 'category',
				title: 'FOREWORLD 洪荒',
				description: '个人博客',
				keywords: ',Bootstrap3',
				virtualPath: '../../',
				topMessage: '欢迎您。今天是'+ year +'年'+ month +'月'+ day +'日。',
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
			title: 'FOREWORLD 洪荒',
			atitle: '登陆',
			description: '个人博客',
			keywords: ',登陆,Bootstrap3',
			virtualPath: '/'
		});
	});

	/**
	 * 日期小于10补0
	 **/
	function p(s) {
		return 10 > s ? '0' + s : s;
	}

	/**
	 * 档案馆
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	*/
	app.get('/archive/', function (req, res) {
		var time = new Date();
		var year = time.getFullYear();
		var month = p(time.getMonth() + 1);
		var day = p(time.getDate());
		res.render('Archive', { 
			moduleName: 'archives',
			title: 'FOREWORLD 洪荒',
			atitle: '档案馆',
			description: '个人博客',
			keywords: ',档案馆,Bootstrap3',
			virtualPath: '../',
			topMessage: '欢迎您。今天是'+ year +'年'+ month +'月'+ day +'日。'
		});
	});

	/**
	 * 标签
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	*/
	app.get('/archive/tag/', function (req, res) {
		var time = new Date();
		var year = time.getFullYear();
		var month = p(time.getMonth() + 1);
		var day = p(time.getDate());
		res.render('Tags', { 
			moduleName: 'tag',
			title: 'FOREWORLD 洪荒',
			atitle: '标签',
			description: '个人博客',
			keywords: ',标签,Bootstrap3',
			virtualPath: '../../',
			topMessage: '欢迎您。今天是'+ year +'年'+ month +'月'+ day +'日。'
		});
	});


};