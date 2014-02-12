var http = require("http"),
	fs = require("fs"),
	url = require("url"),
	conf = require("./server.conf"),
	router = require("./router.js"),
	mime = require("./mime.js").types;

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

		fs.stat(realPath, function ($err, $stats){
			if($err) {
				console.log($err)
                $response.writeHead(404, "not found", {"Content-Type": "text/plain"});
                $response.write("the request "+ realPath +" is not found");
                $response.end();
			} else {
				if($stats.isDirectory()){

				} else {
					$response.writeHead(200, { "Content-Type": "text/html" });
					var rst = fs.createReadStream(realPath, { encoding: "utf-8" });
					rst.on("error", function ($err){
						console.log($err)
					});

					// console.log(rst)
					rst.pipe($response);
				}
			}
		});

	});

	server.setTimeout(3000, function(arg1){
		// arg1.server._events.request.abort();
		// console.log(arg1)
	});

	server.on("error", function ($err){
		console.log($err);
	});

	server.listen(port, function(){
		console.log("Server running at http://127.0.0.1:%s/", port);
	});
}

exports.start = onStart;