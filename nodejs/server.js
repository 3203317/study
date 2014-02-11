var http = require("http");
var fs = require("fs");
var url = require("url")
var conf = require("./server.conf")
var router = require("./router.js")

function onStart() {
	var port = conf.appConf.port;
	console.log(conf)

	http.createServer(function ($request, $response) {

		var pathname = url.parse($request.url).pathname;

		router.route(pathname);
		
		fs.readFile("./index.html","utf-8",function ($err, $data){
			if($err) throw $err;
			$response.writeHead(200, {'Content-Type': 'text/html'});
			$response.write($data);
			$response.end();
		});

	}).listen(port);

	console.log("Server running at http://127.0.0.1:"+ port +"/");
}

exports.start = onStart;