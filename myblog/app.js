
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
// var user = require('./routes/user');
var http = require('http');
var path = require('path');

var cwd = process.cwd();
var fs = require('fs')

var app = express();
var velocity = require('velocityjs')

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
// app.engine('.html', require('ejs').__express);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.html',function(path,options,fn){  
	var template = fs.readFileSync(path).toString();  
	var macros = {  
		parse: function(file) {  
			var template = fs.readFileSync(cwd + '/views/' + file).toString()  
			return this.eval(template);  
		}
	}
	try{
		fn(null, velocity.render(template, options, macros))  
	}catch(err){  
		console.log(err);  
		fn(err)  
	}  
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

routes(app)