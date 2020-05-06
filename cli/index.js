#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var commander_1 = require("commander");
var chalk_1 = require("chalk");
var package_json_1 = require("./package.json");
var program = commander_1.createCommand();
var primary = '#5438dc';
program
    .version("c0d3 cli version: " + package_json_1.version, undefined, 'Show the c0d3 cli version information')
    .helpOption(undefined, 'Display help menu')
    .usage("[options] \n\n  " + chalk_1["default"]
    .hex(primary)
    .bold('A command line interface (CLI) for c0d3.com'))
    .parse(process.argv)
    .help();
// List Command
program
    .command('submit')
    .alias('l')
    .description('Submits git diff of challenge to c0d3.com')
    .action(function () { return console.log('Submit'); });
//   fs.readdir(path.join(__dirname, '/cmd'), (err, files) => {
//     if (err) return console.error('Unable to find command plugin')
//     const command = inputs._[0]
//     if (files.includes(command)) return require(`./cmd/${command}`)(inputs)
//     return require('./cmd/help')(inputs)
//   })
// }
