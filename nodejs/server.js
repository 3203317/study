var http = require("http");
var fs = require("fs");
var url = require("url")
var conf = require("./server.conf")
var router = require("./router.js")

function onStart() {
	var port = conf.appConf.port;
	console.log(conf)

	http.createServer(function ($request, $response) {
		var realPath = router.route($request);
		console.log(realPath)

		if ("./" == realPath) { realPath = "./index.html" };

		fs.readFile(realPath,"utf-8",function ($err, $data){
			if($err) {
				console.log($err)
			} else {
				$response.writeHead(200, {'Content-Type': 'text/html'});
				$response.write($data);
				$response.end();
			}
		});

	}).listen(port);

	console.log("Server running at http://127.0.0.1:"+ port +"/");
}

exports.start = onStart;