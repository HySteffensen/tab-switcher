(function() {
    "use strict";

    var assert = require('chai').assert;
    var http = require('http');
    var server = require('./server');

    const PORT = 8080;

    
    describe("Server", function() {

        afterEach(function(done) {
            server.stop(function() {
                done();
            });
        });

        it("returns a 200 response", function(done) {
            server.start(PORT);
            http.get("http://localhost:" + PORT, function(res) {
                assert.equal(res.statusCode, 200);
                done();
            });
        });

        it("serves the index file", function(done) {
            server.start(PORT);
            http.get("http://localhost:" + PORT + "/index.html", function(res) {
                assert.equal(res.statusCode, 200);
                done();
            });
        });
    });

    describe("Server Already Shut Down", function() {
        it("requires a port number", function() {
            assert.throws(function() {
                server.start();
            });
        });

        it("calling stop when the server isn't started throws exception", function(done) {
            assert.throws(function() {
                server.stop(function() {});
                done();
            });
        });
    });

    



}());