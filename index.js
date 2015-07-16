#!/usr/bin/env node

(function() {
'use strict';

// Deps
var chalk = require('chalk');
var meow = require('meow');
var pkg = require('./package.json');
var path = require('path');
var cssRenamer = require('./src/cssRenamer.js');

var cli = meow({
    help: false,
    pkg: pkg
});

var flags = cli.flags;
var args = cli.input;
var cmd = args[0];

function init() {
    if ((Object.keys(flags).length === 0 
            && args.length === 0 
            && cmd === undefined) || args.length < 3) {
        defaultMessage();
    }

    var str = args[0];
    var replacement = args[1];
    var dir = path.resolve(process.cwd(), args[2]);

    cssRenamer.replaceAll(dir, str, replacement);
}

function defaultMessage() {
    console.log('usage: '
        + 'rename-css-class [pattern] [replacement] [file ...]')
}

// Execution
init();

}())
