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

	/**
	 * 标签更多
	 *
	 * @method
	 * @params req
	 * @params res
	 * @return
	 */
	app.get('/archive/tag/:id/more', function (req, res) {
		var tagName = req.params.id.trim();

		try{
			var data = eval('('+ req.query.data +')');

			Article.findArticlesByTagName(tagName, [data.Current,10], function(err, docs){
				if(err){
					res.send('');
				}
				res.render('Tag_More', {
					virtualPath: virtualPath +'../../',
					articles: docs
				});
			});
		}catch(e){
			res.send('')
			console.log(e);
		}
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
		var articleId = req.params.id.trim();

		Article.findArticleById(articleId, function(err, doc){
			if(err){
				res.render('404')
			}else{
				var article = doc;

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
			}
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

	app.get('/category/add.do', function (req, res) {

		var category = {
			CategoryName: 'haha',
			CategoryOrder: 1,
			CategoryIntro: '',
			CategoryCount: 1
		};

		Category.saveNew(category, function(err, doc){
			var result = { Success: true };

			if(err) {
				result.Success = false;
				result.err = err;
			}else{
				result.data = doc;
			}

			res.send(JSON.stringify(result));
		});
	});
};