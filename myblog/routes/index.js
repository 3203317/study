
var Category = require('../modules/Category.js'),
	category = new Category();

module.exports = function(app) {
	app.get('/', function (req, res) {
		res.render('index', { title: category.GetAll()[0] });
	});


	app.get('/user/login', function (req, res) {
		res.render('User/Login', { 
			title: 'FOREWORLD 洪荒',
			atitle: '登陆',
			description: '个人博客',
			keywords: ',登陆,Bootstrap3',
			virtualPath: '/',
			title1: category.GetAll()[0] 
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

	/**
	 * 首页
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	*/
	app.get('/index.html', function (req, res) {
		var time = new Date();
		var year = time.getFullYear();
		var month = p(time.getMonth() + 1);
		var day = p(time.getDate());
		res.render('Index', { 
			moduleName: 'index',
			title: 'FOREWORLD 洪荒',
			description: '个人博客',
			keywords: ',Bootstrap3',
			virtualPath: '',
			topMessage: '欢迎您。今天是'+ year +'年'+ month +'月'+ day +'日。'
		});
	});


};