/* globals jake:false, desc:false, task:false, complete:false, fail:false, directory:false */

"use strict";

var jshint = require("simplebuild-jshint");
var mocha = require("jake-mocha");

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
    files: './src/test-dir/**/*.js'
}, { async: true });

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
