var http = require("http"),
	fs = require("fs"),
	url = require("url"),
	path = require("path"),
	conf = require("./server.conf"),
	router = require("./router.js"),
	mime = require("./mime.js").types;

function onStart() {
	var appConf = conf.appConf,
		port = appConf.port,
		welcome = appConf.welcome;

	// console.log(appConf);

	var server = http.createServer(function ($request, $response) {
		var realPath = router.route($request);

		/* 获取文件后缀 */
		var ext = path.extname(realPath);
		ext = ext ? ext.slice(1) : "unknown";

		/* */
		var contentType = mime[ext] || "text/plain";


		var eee = {
			fileMatch: /^(gif|png|jpg|js|css|html)$/ig,
			maxAge: 60 * 60 * 24 * 365
		};


		// if ("/" == realPath) { realPath = "/"+ welcome };

		realPath = "."+ realPath;

		fs.stat(realPath, function ($err, $stats){
			if($err) {
				console.log($err)
                $response.writeHead(404, "not found", {"Content-Type": "text/plain"});
                $response.write("the request "+ realPath +" is not found");
                $response.end();
			} else {
				if($stats.isDirectory()){
					console.log("isDirectory")
					$response.end();
				} else {
					$response.setHeader("Content-Type", contentType);

					var lastModified = $stats.mtime.toUTCString();
					var ifModifiedSince = "If-Modified-Since".toLowerCase();
					$response.setHeader("Last-Modified", lastModified);

					if (ext.match(eee.fileMatch)) {
						var expires = new Date();
						expires.setTime(expires.getTime() + eee.maxAge * 1000);
						$response.setHeader("Expires", expires.toUTCString());
						$response.setHeader("Cache-Control", "max-age=" + eee.maxAge);
					}

					if($request.headers[ifModifiedSince] && lastModified == $request.headers[ifModifiedSince]) {
						console.log("从浏览器cache里取")
						$response.writeHead(304, "Not Modified");
						$response.end();
					}else{
						var rst = fs.createReadStream(realPath, { encoding: "utf-8" });
						rst.on("error", function ($err){
							console.log($err)
						});

						// console.log(rst)
						rst.pipe($response);
					}
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