;(function() {
'use strict';

var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var wrench = require('wrench');
var cssRenamer = require('../src/cssRenamer.js');

describe('rename css class', function() {

    var testSrcDir = path.resolve(__dirname, 'testSrc');
    var testDir = path.resolve(__dirname, 'testSample');

    before(function(done) {
        wrench.copyDirSyncRecursive(testSrcDir, testDir);
        done();
    })

    it('should pass', function(done) {
        cssRenamer.replaceAll(testDir, 'foo', 'replaceFoo');
        done();
    })

    after(function(done) {
        rimraf(testDir, function(e) {
            done();
        })
    })
})

}());
