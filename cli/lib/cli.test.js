"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const cli = require('./cli.js')
var cli_1 = __importDefault(require("./cli"));
describe('c0d3.com cli', function () {
    test.skip('displays error message for invalid commands', function () {
        var errorMessage = '';
        var log = function (msg) { return (errorMessage += msg); };
        console.error = jest.fn(log);
        cli_1.default(['ignore', 'c0d3', 'invalid']);
        expect(errorMessage).toMatch(/invalid/);
    });
});
