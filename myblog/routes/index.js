var site = require('../controllers/site');
var category = require('../controllers/category');
var user = require('../controllers/user');
var archive = require('../controllers/archive');
var tag = require('../controllers/tag');
var article = require('../controllers/article');

var virtualPath = '';
var title = 'FOREWORLD 洪荒';

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
		res.render('404', {
			state: 404,
			url: req.url,
			title: title,
			atitle: '404',
			description: '个人博客',
			keywords: ',个人博客,Bootstrap3',
			virtualPath: virtualPath +'/'
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
	app.get('/index.html', site.index);
	app.get('/', site.index);
	app.get('/index/more', site.index_more);
	app.get('/install', site.install);

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
	app.get('/archive/:id.html', article.id);

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
	app.post('/article/add.do', article.add);

	app.post('/category/add.do', category.add);
};