;(function() {
'use strict';

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

function CssRenamer() {

}

/**
 * Recursively replace all str with replacement on lines with 'class' if html
 * @param {String} dir - absolute path of directory
 * @param {String} str - class name
 * @param {String} replacement - replacement name
 */
CssRenamer.prototype.replaceAll = function(dir, str, replacement) {
    fs.readdirSync(dir).forEach(function(file) {
        var stats = fs.lstatSync(path.resolve(dir, file));
        if (stats.isFile()) {
            if (file.indexOf('.html') > -1) {
                replaceInFile(path.resolve(dir, file), str, replacement, 'class');
            } else if (file.indexOf('.css') > -1 || file.indexOf('.scss') > -1) {
                replaceInFile(path.resolve(dir, file), str, replacement, '.'+str);
            }
        } else if (stats.isDirectory()) {
            this.replace(path.resolve(dir, file), str, replacement);
        }
    }.bind(this));
}

/**
 * Replaces all str with replacement on lines with keyword
 * @param {String} file - absolute path of file
 * @param {String} str - original string to replace
 * @param {String} replacement - replacement string
 * @param {=String} keyword - only replace on lines with this keyword
 */
function replaceInFile(file, str, replacement, keyword) {
    fs.readFile(file, 'utf8', function(e, data) {
        if (e) { throw new Error(e) }

        var regExp = new RegExp(str, 'g');

        var isModded = false;
        // only replace str on lines with 'class'
        var split = data.split("\n");
        var modLine;
        var output = chalk.green(file) + '\n';
        for (var i = 0; i<split.length; i++) {
            if (keyword !== undefined) {
                if (!lineContainsStr(split[i], keyword)) { continue }
            }

            if (split[i].match(regExp) == null) { continue }

            modLine = split[i].replace(regExp, replacement);
            split[i] = modLine;
            isModded = true;
            // log out to screen the modifiedLine
            output += chalk.yellow('line ' + (i+1)) + ': ' + modLine + '\n';
        }

        if (!isModded) { return }
        console.log(output);
        // ignore last line, created by splitting by \n
        var modifiedFile = split.filter(function(d, i) {
            return (i !== split.length-1);
        })
        .join("\n");

        fs.writeFile(file, modifiedFile, 'utf8', function(e) {
            if (e) { throw new Error(e) }
        })
    })
}

/**
 * Checks to see if line contains str
 * @param {String} line - evaluate against
 * @param {String} str - evaluate string
 * @returns {Boolean} - true if line contains str
 */
function lineContainsStr(line, str) {
    return (line.indexOf(str) > -1);
}

// return singleton
var cssRenamer = module.exports = new CssRenamer();

}());
