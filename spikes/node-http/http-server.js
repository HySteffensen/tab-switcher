/* The purpose of this spike is to demonstrate a very simple way of 
    launching an http module server. It is in no way intended to be of
    production quality. */


"use strict";

var http = require('http');

var server = http.createServer();

server.listen(8080);

server.on("request", function(req, res) {

    var htmlContent = "<html><head><title>Node HTTP Spike</title></head>" +
        "<body><p>This is a spike of Node's HTTP module</p></body></html>";

    /* The vorbose way */
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write("hello");
    // res.end();

    /* The consise way */

    console.log(htmlContent);
    res.end(htmlContent);
});