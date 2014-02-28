
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
			virtualPath: '/',
			title1: category.GetAll()[0] 
		});
	});

	app.get('/archive/', function (req, res) {
		res.render('Archive', { 
			title: 'FOREWORLD 洪荒',
			atitle: '档案馆',
			virtualPath: '../',
			topMessage: '欢迎您。今天是2014年02月28日。'
		});
	});
};