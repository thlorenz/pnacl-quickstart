'use strict';

var http     = require('http');
var fs       = require('fs');
var path     = require('path');
var build    = require('./build');
var ecstatic = require('ecstatic');

function serveError (res, err) {
  console.error(err);
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end(err.toString());
}

function serveBundle (res) {
  res.writeHead(200, { 'Content-Type': 'application/javascript' });
  build().pipe(res);
}

var handleStatic = ecstatic({ root: path.join(__dirname, '..') });

var server = http.createServer(function (req, res) {
  console.log('%s %s', req.method, req.url);
  if (req.url === '/client/bundle.js') return serveBundle(res);
  handleStatic(req, res);
});

server.on('listening', function (address) {
  var a = server.address();
  console.log('listening: http://%s:%d', a.address, a.port);  
});
server.listen(3000);
