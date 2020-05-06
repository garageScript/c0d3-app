"use strict";
var GET_LESSONS = "\n  query getLesson {\n    lessons {\n      id\n      title\n      challenges {\n        id\n        title\n        order\n      }\n      order\n    }\n  }\n";
var IS_TOKEN_VALID = "\n  query isTokenValid($cliToken: String!) {\n    isTokenValid(cliToken: $cliToken)\n  }\n";
var GET_CLI_TOKEN = "\n  query cliToken($username: String!, $password: String!) {\n    cliToken(username: $username, password: $password)\n  }\n";
var POST_SUBMISSION = "\n  mutation CreateSubmission($submission: SubmissionInput) {\n    createSubmission(input: $submission) {\n      id\n      diff\n      order\n    }\n";
module.exports = {
    GET_LESSONS: GET_LESSONS,
    IS_TOKEN_VALID: IS_TOKEN_VALID,
    GET_CLI_TOKEN: GET_CLI_TOKEN,
    POST_SUBMISSION: POST_SUBMISSION
};
