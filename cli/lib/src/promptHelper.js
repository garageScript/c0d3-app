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
// @ts-nocheck
var chalk_1 = __importDefault(require("chalk"));
var LESSON_ORDER = "\nThe lesson number needs to be a non-negative integer.\nTo cancel submission, press Ctrl + d\n";
var CHALLENGE_ORDER = "\nThe challenge number needs to be a non-negative integer.\nTo cancel submission, press Ctrl + d\n";
var choices = function (array) {
    return array
        .sort(function (a, b) { return a.order - b.order; })
        .reduce(function (acc, _a) {
        var order = _a.order, id = _a.id, title = _a.title, challenges = _a.challenges;
        console.log("Enter " + chalk_1.default.bold.blue(order) + " to select: " + title + ".");
        acc[order] = { id: id, title: title };
        if (challenges)
            acc[order].challenges = challenges;
        return acc;
    }, {});
};
exports.promptForLessons = function (lessons) { return __awaiter(void 0, void 0, void 0, function () {
    var lessonsByOrder, lesson, challengeByOrder, challenge, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                lessonsByOrder = choices(lessons);
                return [4 /*yield*/, prompt([
                        {
                            type: 'input',
                            name: 'lesson',
                            message: 'What lesson do you want to submit?',
                            validate: function (input) {
                                if (!lessonsByOrder[input])
                                    return LESSON_ORDER;
                                return true;
                            }
                        }
                    ])];
            case 1:
                lesson = (_a.sent()).lesson;
                challengeByOrder = choices(lessonsByOrder[lesson].challenges);
                return [4 /*yield*/, prompt([
                        {
                            type: 'input',
                            name: 'challenge',
                            message: 'What challenge do you want to submit?',
                            validate: function (input) {
                                if (!challengeByOrder[input])
                                    return LESSON_ORDER;
                                return true;
                            }
                        }
                    ])];
            case 2:
                challenge = (_a.sent()).challenge;
                id = challengeByOrder[challenge].id;
                console.log('🤖: id', id);
                return [2 /*return*/];
        }
    });
}); };
exports.promptForChallenge = function (currentLesson) {
    var challengesByOrder = currentLesson.challenges
        .sort(function (a, b) { return a.order - b.order; })
        .reduce(function (acc, _a) {
        var title = _a.title, order = _a.order, id = _a.id;
        console.log("Enter " + order + " to submit to challenge: " + title + ". ");
        acc[order] = {
            title: title,
            id: id
        };
        return acc;
    }, {});
    var schema = {
        properties: {
            challengeOrder: {
                description: chalk_1.default.rgb(84, 64, 216).bold('Challenge order'),
                pattern: /^[0-9][0-9]*$/,
                message: CHALLENGE_ORDER,
                required: true
            }
        }
    };
    prompt.message = '';
    prompt.start();
    return new Promise(function (resolve, reject) {
        prompt.get(schema, function (err, result) {
            var challengeOrder = result.challengeOrder;
            var currentChallenge = challengesByOrder[challengeOrder];
            if (err)
                return reject(err);
            if (!currentChallenge) {
                return reject(chalk_1.default.red('\nThe challenge assigned to the number did not exist!'));
            }
            var challenge = chalk_1.default.bold.blue(challengeOrder + " - " + currentChallenge.title);
            console.log('Command-line input received:');
            console.log("  Challenge Number: " + challenge + "\n");
            return resolve(currentChallenge.id);
        });
    });
};
