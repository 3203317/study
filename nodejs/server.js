var http = require("http"),
	fs = require("fs"),
	url = require("url"),
	conf = require("./server.conf"),
	router = require("./router.js")

function onStart() {
	var appConf = conf.appConf,
		port = appConf.port,
		welcome = appConf.welcome;

	console.log(appConf);

	var server = http.createServer(function ($request, $response) {
		var realPath = router.route($request);
		console.log(realPath)

		if ("/" == realPath) { realPath = "/"+ welcome };

		realPath = "."+ realPath;

		fs.readFile(realPath, "utf-8", function ($err, $data){
			if($err) {
				// console.log($err)
			} else {
				$response.writeHead(200, {"Content-Type": "text/html"});
				$response.write($data);
				$response.end();
			}
		});

	});

	server.setTimeout(3000, function(arg1){
		// arg1.server._events.request.abort();
	});

	server.listen(port, function(){
		console.log("Server running at http://127.0.0.1:%s/", port);
	});
}

exports.start = onStart;