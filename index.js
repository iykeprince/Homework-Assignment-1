var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');

var server = http.createServer(function(req, res){
	var parsedUrl = url.parse(req.url, true);
	//get the part
	var path = parsedUrl.pathname;
	var trimmedPath = path.replace(/^\/+|\+$/g, '');

	//get the querystring
	var queryStringObj = parsedUrl.query;
	//get the header 
	var headers = req.headers;
	//get method
	var method = req.method;

	//get the payload, if available
	var decoder = new StringDecoder('utf-8');
	var payload = '';
	req.on('data', function(data){
		payload += decoder.write(data);
	});
	req.on('end', function(){
		payload += decoder.end();
		//choose a handler for the request
		var choosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
	
		//construct the data
		var data = {
			'trimmedPath': trimmedPath,
			'queryStringObj': queryStringObj,
			'method': method,
			'headers': headers,
			'payload':payload
		};

		//route the request
		choosenHandler(data, function(statusCode, payload){
			statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
			payload = typeof(payload) == 'object' ? payload : {};

			var payloadString = JSON.stringify(payload);
			// var welcomeMessage = ;
			//return the response
			res.setHeader('Content-Type', 'application/json');
			res.writeHead(statusCode);
			res.end(payloadString);
			console.log('Returning Welcome mesage');

		});
	});
});	

server.listen(config.port, function(req, res){
	console.log('server is listen on ' + config.port);
});

var handlers = {};

handlers.hello = function(data, callback){
	callback(200,   {'welcome' : 'Hello welcome to Node.js Master Class'});
}
handlers.notFound = function(data, callback){
	callback(404);
}

var router = {
	'hello' : handlers.hello
};