var EventProxy = require('eventproxy');
var Category = require('../modules/Category.js');

var Article = require('../modules/Article.js');

var site = require('../controllers/site');
var category = require('../controllers/category');
var user = require('../controllers/user');
var archive = require('../controllers/archive');
var tag = require('../controllers/tag');

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

	/**
	 * 首页
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	 */
	app.get('/index.html', site.index);
	app.get('/', site.index);
	app.get('/index/more', site.index_more);

	/**
	 * 分类
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	 */
	app.get('/archive/category/:id', category.index);
	app.get('/archive/category/:id/more', category.index_more);

	/**
	 * 登陆
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	 */
	app.get('/user/login', user.login);

	/**
	 * 档案馆 
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	 */
	app.get('/archive/', archive.index);
	app.get('/archive/:id.html', archive.id);

	/**
	 * 标签馆
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	 */
	app.get('/archive/tag/', tag.index);
	app.get('/archive/tag/:id', tag.id);
	app.get('/archive/tag/:id/more', tag.id_more);

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

	app.post('/category/add.do', category.add);
};