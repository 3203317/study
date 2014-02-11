var http = require("http");
var fs = require("fs");
var url = require("url")
var conf = require("./server.conf")

function onStart() {
	var port = conf.appConf.port;
	console.log(conf)

	http.createServer(function ($request, $response) {

		var pathname = url.parse($request.url).pathname;

		console.log(pathname);

		$response.writeHead(200, {"Content-Type": "text/plain"})
		$response.write("Hello, World!")
		$response.end()

	}).listen(port);

	console.log("Server running at http://127.0.0.1:"+ port +"/");
}

exports.start = onStart;