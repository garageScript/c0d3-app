"use strict";
var git = require('simple-git')();
var chalk = require('chalk');
var CURRENT_BRANCH = "\nYou are currently on branch ";
var WRONG_BRANCH = "\nSubmissions must come from branches that are " + chalk.bold.red('not master. ') + "\nPlease make sure that you branch, add, commit, and submit correctly.";
var NO_DIFFERENCE = "\nThere are " + chalk.bold.red('no differences ') + "\nin your current branch from your master branch.";
var DIFF = "\nDifferences from your current branch to master:\n\n";
var checkCurrentBranch = function () {
    return new Promise(function (resolve, reject) {
        git.branch(function (error, stdout, stderr) {
            if (error || stderr)
                return reject(error || stderr);
            console.log(CURRENT_BRANCH + chalk.bold.blue(stdout.current));
            if (stdout.current === 'master') {
                return reject(WRONG_BRANCH);
            }
            resolve(stdout.current);
        });
    });
};
var getDiffAgainstMaster = function (current) {
    return new Promise(function (resolve, reject) {
        git.diff(["--color", "master.." + current], function (error, stdout, stderr) {
            if (error || stderr)
                return reject(error || stderr);
            if (stdout.length === 0 || stdout === '\n') {
                return reject(NO_DIFFERENCE);
            }
            console.log(DIFF + stdout);
            return resolve();
        });
    });
};
var createDiff = function (currentBranch) {
    return new Promise(function (resolve, reject) {
        git.diff(["master.." + currentBranch], function (error, stdout, stderr) {
            if (error || stderr)
                return reject(error || stderr);
            return resolve(stdout);
        });
    });
};
module.exports = { checkCurrentBranch: checkCurrentBranch, getDiffAgainstMaster: getDiffAgainstMaster, createDiff: createDiff };
