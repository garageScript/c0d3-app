"use strict";
var chalk = require('chalk');
var prompt = require('prompt');
var LESSON_ORDER = "\nThe lesson number needs to be a non-negative integer.\nTo cancel submission, press Ctrl + d\n";
var CHALLENGE_ORDER = "\nThe challenge number needs to be a non-negative integer.\nTo cancel submission, press Ctrl + d\n";
var promptForLessons = function (lessons) {
    var lessonsByOrder = lessons
        .sort(function (a, b) { return a.order - b.order; })
        .reduce(function (acc, _a) {
        var order = _a.order, id = _a.id, title = _a.title, challenges = _a.challenges;
        console.log("Enter " + order + " to submit to lesson: " + title + ".");
        acc[order] = {
            title: title,
            challenges: challenges,
            id: id
        };
        return acc;
    }, {});
    var schema = {
        properties: {
            lessonOrder: {
                description: chalk.rgb(84, 64, 216).bold('Lesson order'),
                pattern: /^[0-9][0-9]*$/,
                message: chalk.red(LESSON_ORDER),
                required: true
            }
        }
    };
    prompt.message = '';
    prompt.start();
    return new Promise(function (resolve, reject) {
        prompt.get(schema, function (err, result) {
            var lessonOrder = result.lessonOrder;
            var currentLesson = lessonsByOrder[lessonOrder];
            if (err)
                return reject(err);
            if (!currentLesson) {
                return reject(chalk.red('\nThe lesson number you gave does not exist!'));
            }
            var lesson = chalk.bold.blue(lessonOrder + " - " + currentLesson.title);
            console.log('\nCommand-line input received:');
            console.log("  Lesson Number: " + lesson + "\n");
            return resolve(currentLesson);
        });
    });
};
var promptForChallenge = function (currentLesson) {
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
                description: chalk.rgb(84, 64, 216).bold('Challenge order'),
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
                return reject(chalk.red('\nThe challenge assigned to the number did not exist!'));
            }
            var challenge = chalk.bold.blue(challengeOrder + " - " + currentChallenge.title);
            console.log('Command-line input received:');
            console.log("  Challenge Number: " + challenge + "\n");
            return resolve(currentChallenge.id);
        });
    });
};
module.exports = {
    promptForLessons: promptForLessons,
    promptForChallenge: promptForChallenge
};
