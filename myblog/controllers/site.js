var EventProxy = require('eventproxy');
var Category = require('../modules/Category.js');
var Article = require('../modules/Article.js');
var Comment = require('../modules/Comment.js');
var Link = require('../modules/Link.js');

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
	var proxy = EventProxy.create('articles', function(articles){
		res.render('Index', { 
			moduleName: 'index',
			title: title,
			description: '个人博客',
			keywords: ',Bootstrap3',
			virtualPath: virtualPath,
			topMessage: getTopMessage(),
			articles: articles
		});
	});

	Article.findArticles([1, 10], function(err, docs){
		if(err){
			console.log(err);
		}
		proxy.emit('articles', docs);
	});
};


exports.index_more = function(req, res, next) {
	try{
		var data = eval('('+ req.query.data +')');

		Article.findArticles([data.Current, 10], function(err, docs){
			if(err){
				res.send('')
			}else{
				res.render('Index_More', {
					virtualPath: virtualPath,
					articles: docs
				});					
			}
		});
	}catch(e){
		res.send('');
		console.log(e);
	}
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

	res.send('ok.');
};