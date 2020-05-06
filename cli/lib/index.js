#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var chalk_1 = __importDefault(require("chalk"));
var package_json_1 = require("./package.json");
var submit_1 = __importDefault(require("./src/submit"));
var program = commander_1.createCommand();
var PRIMARY = '#5438dc'; // c0d3.com PRIMARY color
var URL = 'https://c0d3.com/api/graphql';
program
    .version("c0d3 cli version: " + package_json_1.version, undefined, 'Show the c0d3 cli version')
    .helpOption(undefined, 'Display help menu')
    .usage("[options] \n\n  " + chalk_1.default
    .hex(PRIMARY)
    .bold('A command line interface (CLI) for c0d3.com'));
// List Command
program
    .command('submit')
    .alias('s')
    .description('Submits git diff of challenge to c0d3.com')
    .option('--url < test > ', 'Set url endpoint for http request', URL)
    .option('-d, --debug')
    .action(submit_1.default);
program.parse(process.argv);
if (!program.args.length)
    program.help();
