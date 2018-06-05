(function() {
    "use strict";

    var assert = require('chai').assert;
    var http = require('http');
    var server = require('./server');

    afterEach(function(done) {
        server.stop(function() {
            done();
        });
    });

    describe("Server", function() {
        it("returns a 200 response", function(done) {
            server.start();
            http.get("http://localhost:8080", function(res) {
                assert.equal(res.statusCode, 200);
                done();
            });
        });

        it("serves the index file", function(done) {
            server.start();
            http.get("http://localhost:8080/index.html", function(res) {
                assert.equal(res.statusCode, 200);
                done();
            });
        });
    });

    



}());