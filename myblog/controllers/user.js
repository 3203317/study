var Category = require('../modules/Category.js');


var virtualPath = '';
var title = 'FOREWORLD 洪荒';

exports.login = function(req, res, next) {
	Category.findCategorys(function(err, docs){
		if(err){
			console.log(err);
		}
		res.render('User/Login', { 
			title: title,
			atitle: '登陆',
			description: '个人博客',
			keywords: ',登陆,Bootstrap3',
			virtualPath: virtualPath +'/',
			categorys: docs
		});
	});
};