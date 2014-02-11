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

	http.createServer(function ($request, $response) {
		var realPath = router.route($request);
		console.log(realPath)

		if ("/" == realPath) { realPath = "/index.html" };

		realPath = "."+ realPath;

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