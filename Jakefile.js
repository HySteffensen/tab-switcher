/* globals jake:false, desc:false, task:false, complete:false, fail:false, directory:false */

(function() {
    "use strict";

    const jshint = require("simplebuild-jshint");
    const mocha = require("jake-mocha");
    const browserify = require("browserify");
    const path = require("path");

    const server = require("./src/server/server");
    const PORT = 8080;

    const BUILD_DIR = "build";
    const CONTENT_DIR = "content";

    desc("Default Task");
    task("default", ["lint", "mocha"], function() {
        console.log("\n\nBUILD OK");
    });

    desc("Lints All the Code");
    task("lint", function() {
        process.stdout.write("Linting JavaScript: ");

        jshint.checkFiles({
            files: [ "Jakefile.js", "./src/**/*.js", "./spikes/**/*.js" ],
            options: lintOptions(),
            globals: lintGlobals()
        }, complete, fail);
    }, { async: true });

    mocha.defineTask({
        name: 'mocha',
        files: './src/server/**/*.js'
    }, { async: true });

    desc("Starts HTTP Server");
    task("run", function() {
        server.start(PORT);
    });

    desc("Build Distribution Directory");
    task("build", function() {
        console.log("Building Distribution Directory: .");
        jake.mkdirP(BUILD_DIR);
        jake.cpR(path.join("./src", CONTENT_DIR), BUILD_DIR);
        jake.exec(
            "node node_modules/browserify/bin/cmd.js -r ./src/javascript/tab-switcher.js:tabs -o " + BUILD_DIR + "/" + CONTENT_DIR + "/bundle.js",
            { interactive: true }, 
            complete
        );
    }, { async:true });

    desc("Clean Distribution Directory");
    task("clean", function() {
        console.log("Clean Distribution: .");
        jake.rmRf(BUILD_DIR);
    });

    function lintOptions() {
        return {
            bitwise: true,
            eqeqeq: true,
            forin: true,
            freeze: true,
            futurehostile: true,
            latedef: "nofunc",
            noarg: true,
            nocomma: true,
            nonbsp: true,
            nonew: true,
            strict: true,
            undef: true,

            node: true,
            browser: true,

            esversion: 6
        };
    }

    function lintGlobals() {
        return {
            // Mocha
            describe: false,
            it: false,
            before: false,
            after: false,
            beforeEach: false,
            afterEach: false
        };
    }
}());
