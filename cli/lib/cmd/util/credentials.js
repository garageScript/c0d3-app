"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var path = require('path');
var chalk = require('chalk');
var homeDir = require('os').homedir();
var fs = require('fs');
var prompt = require('prompt');
var request = require('graphql-request').request;
var _a = require('../util/graphql'), IS_TOKEN_VALID = _a.IS_TOKEN_VALID, GET_CLI_TOKEN = _a.GET_CLI_TOKEN;
var DIR = '.c0d3';
var credentialsPath = path.join(homeDir, DIR, 'credentials.json');
var verifyToken = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var cliToken, isTokenValid, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                cliToken = require(credentialsPath).cliToken;
                return [4 /*yield*/, request(url, IS_TOKEN_VALID, {
                        cliToken: cliToken
                    })];
            case 1:
                isTokenValid = (_b.sent()).isTokenValid;
                return [2 /*return*/, { isTokenValid: isTokenValid, cliToken: cliToken } || false];
            case 2:
                _a = _b.sent();
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
var askCredentials = function () {
    return new Promise(function (resolve, reject) {
        var schema = [
            {
                description: chalk.rgb(84, 64, 216).bold('username'),
                name: 'username',
                required: true
            },
            {
                description: chalk.rgb(84, 64, 216).bold('password'),
                name: 'password',
                hidden: true,
                replace: '*'
            }
        ];
        prompt.message = '';
        prompt.start();
        prompt.get(schema, function (err, result) {
            if (err) {
                return reject(chalk.red('\n  Unable to obtain username/password'));
            }
            resolve(result);
        });
    });
};
var getToken = function (credentials, url) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, cliToken, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                username = credentials.username, password = credentials.password;
                return [4 /*yield*/, request(url, GET_CLI_TOKEN, {
                        username: username,
                        password: password
                    })];
            case 1:
                cliToken = (_a.sent()).cliToken;
                return [2 /*return*/, cliToken];
            case 2:
                error_1 = _a.sent();
                console.log(chalk.red('Invalid credentials, please try again!'));
                return [2 /*return*/, askCredentials()];
            case 3: return [2 /*return*/];
        }
    });
}); };
var saveToken = function (cliToken) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                createHiddenDir();
                return [4 /*yield*/, createCredentialsFile(credentialsPath, cliToken)];
            case 1:
                _b.sent();
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                console.error('Unable to create hidden directory and save credentials');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createHiddenDir = function () {
    var hiddenDir = path.join(homeDir, DIR);
    if (!fs.existsSync(hiddenDir)) {
        fs.mkdirSync(hiddenDir);
    }
};
var createCredentialsFile = function (credentialsPath, cliToken) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(credentialsPath, JSON.stringify({ cliToken: cliToken }), function (err) {
            if (err)
                return reject('Unable to save credentials');
            resolve();
        });
    });
};
module.exports = {
    verifyToken: verifyToken,
    askCredentials: askCredentials,
    getToken: getToken,
    saveToken: saveToken
};
