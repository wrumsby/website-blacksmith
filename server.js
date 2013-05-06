'use strict';

var http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs'),
	port = process.env.PORT || 1337,
	extensions = {
		'.html': 'text/html',
		'.css': 'text/css'
	};

function getFile (localPath, mimeType, res) {
	fs.readFile(localPath, function (err, contents) {
		if (!err) {
			res.writeHead(200, {
				'Content-Type': mimeType,
				'Content-Length': contents.length
			});
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}

function getIndex (res) {
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	res.end('<html><body>Soon</body></html>');	
}

http.createServer(function (req, res) {
	var filename = path.basename(req.url) || 'index.html',
		ext = path.extname(filename),
		localPath = __dirname + '/public/';

	if (filename === 'index.html') {
		localPath += 'index.html';
	} else {
		localPath += url.parse(req.url).pathname.replace(/\+/g, '-');
	}

	if (!ext) {
		ext = '.html';
		localPath += '/index.html';
	}

	fs.exists(localPath, function (exists) {
		if (exists) {
			getFile(localPath, extensions[ext], res);
		} else if (localPath === __dirname + '/public/index.html') {
			getIndex(res);
		} else {
			res.writeHead(404);
			res.end();
		}
	});
}).listen(port);