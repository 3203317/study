var EventProxy = require('eventproxy');
var Category = require('../modules/Category.js');
var Article = require('../modules/Article.js');
var Comment = require('../modules/Comment.js');
var Link = require('../modules/Link.js');
var Tag = require('../modules/Tag.js');

var fs = require('fs')
var velocity = require('velocityjs')
var cwd = process.cwd();

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
	res.render('Index', { 
		moduleName: 'index',
		title: title,
		description: '个人博客',
		keywords: ',Bootstrap3',
		virtualPath: virtualPath,
		topMessage: getTopMessage()
	});
};


exports.index_more = function(req, res, next) {
	var data;
	try{
		data = eval('('+ req.query.data +')');
	}catch(e){
		res.send('');
		return;
	}

	Article.findArticles([data.Current, 10], function(err, docs){
		if(err){
			res.send('')
			return;
		}

		res.render('Index_More', {
			virtualPath: virtualPath,
			articles: docs
		});
	});
};


exports.install = function(req, res, next) {	
	var path = '/views/pagelet/';

	Category.findCategorys(function(err, docs){
		if(err){
			console.log(err);
		}else{
			fs.readFile(cwd + path +'TopNavCategory.vm.html', 'utf8', function(err, data){
				if(err){
					console.log(err)
				}else{
					var template = data;

					var html = velocity.render(template, {
						virtualPath: '/',
						categorys: docs
					});

					fs.writeFile(cwd + path +'topNavCategory.html', html, 'utf8', function(err){
						if(err){
							console.log(err)
						}
					});
				}
			});	
		}	
	});

	Article.findTop10ViewNums(function(err, docs){
		if(err){
			console.log(err);
		}else{
			fs.readFile(cwd + path +'Top10ViewNums.vm.html', 'utf8', function(err, data){
				if(err){
					console.log(err)
				}else{
					var template = data;

					var html = velocity.render(template, {
						virtualPath: '/',
						top10ViewNums: docs
					});

					fs.writeFile(cwd + path +'top10ViewNums.html', html, 'utf8', function(err){
						if(err){
							console.log(err)
						}
					});
				}
			});			
		}
	});

	Comment.findComments([1, 10], function(err, docs){
		if(err){
			console.log(err);
		}else{
			fs.readFile(cwd + path +'Top10Comments.vm.html', 'utf8', function(err, data){
				if(err){
					console.log(err)
				}else{
					var template = data;

					var html = velocity.render(template, {
						virtualPath: '/',
						top10Comments: docs
					});

					fs.writeFile(cwd + path +'top10Comments.html', html, 'utf8', function(err){
						if(err){
							console.log(err)
						}
					});
				}
			});			
		}
	});

	Link.findLinks(1, function(err, docs){
		if(err){
			console.log(err);
		}else{
			fs.readFile(cwd + path +'UsefulLinks.vm.html', 'utf8', function(err, data){
				if(err){
					console.log(err)
				}else{
					var template = data;

					var html = velocity.render(template, {
						virtualPath: '/',
						usefulLinks: docs
					});

					fs.writeFile(cwd + path +'usefulLinks.html', html, 'utf8', function(err){
						if(err){
							console.log(err)
						}
					});
				}
			});		
		}
	});

	Article.findTopMarks(function(err, docs){
		if(err){
			console.log(err);
		}else{
			fs.readFile(cwd + path +'TopMarks.vm.html', 'utf8', function(err, data){
				if(err){
					console.log(err)
				}else{
					var template = data;

					var html = velocity.render(template, {
						virtualPath: '/',
						topMarks: docs
					});

					fs.writeFile(cwd + path +'topMarks.html', html, 'utf8', function(err){
						if(err){
							console.log(err)
						}
					});
				}
			});
		}
	});

	Article.findArticles([1, 10], function(err, docs){
		if(err){
			console.log(err);
		}else{
			fs.readFile(cwd + path +'ArticleIntros.vm.html', 'utf8', function(err, data){
				if(err){
					console.log(err)
				}else{
					var template = data;

					var html = velocity.render(template, {
						virtualPath: '/',
						articles: docs
					});

					fs.writeFile(cwd + path +'articleIntros.top10.html', html, 'utf8', function(err){
						if(err){
							console.log(err)
						}
					});
				}
			});
		}
	});

	createTagsFile(path);
	createArchiveListFile(path);

	res.send('ok.');
};

function createTagsFile(path){
	Tag.findTags(function(err, docs){
		if(err){
			throw err;
		}

		var tags = docs;

		Article.findAll(function(err, docs){
			if(err){
				throw err;
			}

			var articles = docs;

			var tags_2 = [];

			for(var i=0,j=tags.length; i<j; i++){
				var tag = tags[i];

				var tag_2 = {
					Id: tag.Id,
					TagName: tag.TagName,
					Articles: []
				};
				tags_2.push(tag_2)
				

				for(var i_3=0,j_3=articles.length; i_3<j_3; i_3++){
					var article = articles[i_3];

					if(null != article.ArticleTag && 0 < article.ArticleTag.length && -1 < article.ArticleTag.indexOf(','+ tag.TagName +',')){
						tag_2.Articles.push(article);
					}
				}
			}

			fs.readFile(cwd + path +'TagList.vm.html', 'utf8', function(err, data){
				if(err){
					console.log(err)
				}else{
					var template = data;

					var html = velocity.render(template, {
						virtualPath: '/',
						tags: tags_2
					});

					fs.writeFile(cwd + path +'tagList.html', html, 'utf8', function(err){
						if(err){
							console.log(err)
						}
					});
				}
			});
		});
	});
}

function createArchiveListFile(path){
	Article.findAll(function(err, docs){
		if(err){
			throw err;
		}

		var archives = [],
			archive,
			articles = docs,
			article,
			archiveChild;

		for(var i=0,j=articles.length; i<j; i++){
			article = articles[i];

			if(0 < archives.length){
				/* 获取最后一条记录年 */
				archive = archives[archives.length - 1];

				if(article.PostTime_Year == archive.Y4){
					/* 获取最后一条记录月 */
					archiveChild = archive.ArchiveChildren[archive.ArchiveChildren.length - 1];
					if(article.PostTime_Month == archiveChild.M2){
						archiveChild.Articles.push(article);
					}else{
						archiveChild = {
							'M2': article.PostTime_Month,
							'Articles': []
						};

						archiveChild.Articles.push(article);
						archive.ArchiveChildren.push(archiveChild);
					}

				}else{
					/* 添加年 */
					archive = {
						'Y4': article.PostTime_Year,
						'ArchiveChildren': []
					};

					/* 添加月 */
					archiveChild = {
						'M2': article.PostTime_Month,
						'Articles': []
					}

					archiveChild.Articles.push(article);

					archive.ArchiveChildren.push(archiveChild);

					archives.push(archive);
				}
			}else{
				/* 添加年 */
				archive = {
					'Y4': article.PostTime_Year,
					'ArchiveChildren': []
				};

				/* 添加月 */
				archiveChild = {
					'M2': article.PostTime_Month,
					'Articles': []
				}

				archiveChild.Articles.push(article);

				archive.ArchiveChildren.push(archiveChild);

				archives.push(archive);
			}
		}

		fs.readFile(cwd + path +'ArchiveList.vm.html', 'utf8', function(err, data){
			if(err){
				console.log(err)
			}else{
				var template = data;

				var html = velocity.render(template, {
					virtualPath: '/',
					archives: archives
				});

				fs.writeFile(cwd + path +'archiveList.html', html, 'utf8', function(err){
					if(err){
						console.log(err)
					}
				});
			}
		});

	});
}