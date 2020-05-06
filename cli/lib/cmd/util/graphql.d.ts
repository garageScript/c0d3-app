export const GET_LESSONS: "\n  query getLesson {\n    lessons {\n      id\n      title\n      challenges {\n        id\n        title\n        order\n      }\n      order\n    }\n  }\n";
export const IS_TOKEN_VALID: "\n  query isTokenValid($cliToken: String!) {\n    isTokenValid(cliToken: $cliToken)\n  }\n";
export const GET_CLI_TOKEN: "\n  query cliToken($username: String!, $password: String!) {\n    cliToken(username: $username, password: $password)\n  }\n";
export const POST_SUBMISSION: "\n  mutation CreateSubmission($submission: SubmissionInput) {\n    createSubmission(input: $submission) {\n      id\n      diff\n      order\n    }\n";
