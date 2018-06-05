(function() {
    "use strict";

    var http = require('http');
    var server;
    
    exports.start = function() {
        server = http.createServer();
        server.listen(8080);

        server.on("request", function(req, res) {
            console.log("req.url " + req.url);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end("hello");
        });
    };

    exports.stop = function(callback) {
        server.close(callback);
    };


}());