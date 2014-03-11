var Category = require('../modules/Category.js');


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
	Category.findCategorys(function(err, docs){
		if(err){
			console.log(err);
		}
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
};