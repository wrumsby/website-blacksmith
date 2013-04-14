'use strict';

var http = require('http'),
	port = process.env.PORT || 1337;

http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Hello world\n');
}).listen(port);