'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('lib/parse-body.js');
const PORT = process.env.PORT || 8000;

const server = http.createServer(function(req, res){
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

//   console.log('req url:', req.url);
//   console.log('req method:', req.method);
//   console.log('req headers:', req.headers);
//   console.log('req url qs:', req.url.query);

if (req.method === 'POST') {
    parseBody(req, function(err) {
        if (err) return console.error(err);
    console.log('POST request body content:', req.body);
    })
}

if ( req.method === 'GET' && req.url.pathname === '/cowsay'){
    res.write(cowsay.say({ text: 'hello from cowville'}));
    res.end();
};
    res.end();
});
server.listen(PORT, function() {
    console.log('server up cuh:', PORT);
});