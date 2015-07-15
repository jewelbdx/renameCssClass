;(function() {
'use strict';

// Deps
var chalk = require('chalk');
var meow = require('meow');
var pkg = require('./package.json');

var cli = meow({
    help: false,
    pkg: pkg
});

var flags = cli.flags;
var args = cli.input;
var cmd = args[0];

function init() {
    if (Object.keys(flags).length === 0 && args.length === 0 && cmd === undefined) {
        defaultMessage();
    }
}

function defaultMessage() {
    console.log('rename-css-class')
}

// Execution
init();

}());
