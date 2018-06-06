/* jshint -W027 */

(function() {
    "use strict";

    var http = require('http');
    var path = require('path');
    var fs = require('fs');
    var server;
    
    exports.start = function(portNumber) {
        if (!portNumber) throw new Error("Port Number Required");
        server = http.createServer();
        server.listen(8080);

        server.on("request", function(req, res) {
            if (req.url === "/index.html") {
                fs.readFile(__dirname + "/index.html", function(err, contents) {
                    if (!err) {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(contents);
                    } else {
                        console.log(err);
                    }
                });
            } else {
                res.end("hello");
            }
        });
    };

    exports.stop = function(callback) {
        if (server === undefined) throw new Error("Server hasn't started.");
        server.close(callback);
    };


}());