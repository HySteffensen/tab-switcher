(function() {
    "use strict";

    var http = require('http');
    var path = require('path');
    var fs = require('fs');
    var server;
    
    exports.start = function() {
        server = http.createServer();
        server.listen(8080);

        server.on("request", function(req, res) {
            
            console.log("req.url " + req.url);
            console.log(typeof(req.url));
            if (req.url === "/index.html") {
                fs.readFile(__dirname + "/index.html", function(err, contents) {
                    if (!err) {
                        res.end(contents);
                    } else {
                        console.log(err);
                    }
                });
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end("hello");
        });
    };

    exports.stop = function(callback) {
        server.close(callback);
    };


}());