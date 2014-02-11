var url = require("url")

function route ($request) {
	var pathname = url.parse($request.url).pathname;

	return "."+ pathname;
}

exports.route = route;