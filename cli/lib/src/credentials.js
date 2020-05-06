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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var os_1 = require("os");
var fs_1 = __importDefault(require("fs"));
var enquirer_1 = require("enquirer");
var ora_1 = __importDefault(require("ora"));
var graphql_request_1 = require("graphql-request");
var graphql_1 = require("./graphql");
var HOME = os_1.homedir();
var DIR = '.c0d3';
var CREDENTIAL_FILE = 'credentials.json';
var QUESTIONS = [
    {
        type: 'input',
        name: 'username',
        message: 'Username:'
    },
    {
        type: 'password',
        mask: '*',
        name: 'password',
        message: 'Password:'
    }
];
var spinner = ora_1.default();
var credentialsPath = path_1.default.join(HOME, DIR, CREDENTIAL_FILE);
exports.verifyToken = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var cliToken, isTokenValid, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                cliToken = require(credentialsPath).cliToken;
                return [4 /*yield*/, graphql_request_1.request(url, graphql_1.IS_TOKEN_VALID, {
                        cliToken: cliToken
                    })];
            case 1:
                isTokenValid = (_b.sent()).isTokenValid;
                return [2 /*return*/, { isTokenValid: isTokenValid, cliToken: cliToken }];
            case 2:
                _a = _b.sent();
                return [2 /*return*/, {
                        isTokenValid: false,
                        cliToken: ''
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.askCredentials = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, enquirer_1.prompt(QUESTIONS)];
            case 1:
                _a = _b.sent(), username = _a.username, password = _a.password;
                spinner.start('Login...');
                if (!username || !password) {
                    spinner.fail(chalk_1.default.red.bold('Unable to obtain username/password\n'));
                    return [2 /*return*/, exports.askCredentials()];
                }
                return [2 /*return*/, { username: username, password: password }];
        }
    });
}); };
exports.getToken = function (credentials, url) { return __awaiter(void 0, void 0, void 0, function () {
    var cliToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, graphql_request_1.request(url, graphql_1.GET_CLI_TOKEN, credentials).catch(function () {
                    spinner.fail(chalk_1.default.red.bold('Invalid credentials, please try again!\n'));
                    throw '';
                })];
            case 1:
                cliToken = (_a.sent()).cliToken;
                return [2 /*return*/, cliToken];
        }
    });
}); };
exports.saveToken = function (cliToken) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                exports.createHiddenDir();
                return [4 /*yield*/, exports.createCredentialsFile(cliToken)];
            case 1:
                _b.sent();
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                spinner.fail(chalk_1.default.red.bold('Unable to create hidden directory and save credentials\n'));
                throw '';
            case 3:
                spinner.succeed('You are logged in');
                return [2 /*return*/];
        }
    });
}); };
exports.createHiddenDir = function () {
    var hiddenDir = path_1.default.join(HOME, DIR);
    if (!fs_1.default.existsSync(hiddenDir)) {
        fs_1.default.mkdirSync(hiddenDir);
    }
};
exports.createCredentialsFile = function (cliToken) {
    return new Promise(function (resolve, reject) {
        fs_1.default.writeFile(credentialsPath, JSON.stringify({ cliToken: cliToken }), function (err) {
            if (err)
                reject();
            resolve();
        });
    });
};
