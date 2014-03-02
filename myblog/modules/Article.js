var mysql = require('mysql');
var conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database:'fw_blog',
	port: 3306
});

function Article(){

}

Article.prototype.findArticles = function(pagination, values, cb) {
	var sql = 'SELECT * FROM F_ARTICLE ORDER BY PostTime DESC limit ?,?';

	conn.connect();
	conn.query(sql, values, function(err, rows, fields) {
		if(err) {
			throw err;
			conn.end();
			return;
		}else{
			console.log(rows)
			cb(rows);
		}
		conn.end();
	});
};

exports = module.exports = Article;