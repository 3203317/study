var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database:'fw_blog',
    port: 3306
});
conn.connect();
conn.query('select * from f_tag', function(err, rows, fields) {
    if (err) throw err;
    console.log(arguments)
});
conn.end();