const GET_LESSONS = `
  query getLesson {
    lessons {
      id
      title
      challenges {
        id
        title
        order
      }
      order
    }
  }
`
const IS_TOKEN_VALID = `
  query isTokenValid($cliToken: String!) {
    isTokenValid(cliToken: $cliToken)
  }
`
const GET_CLI_TOKEN = `
  query cliToken($username: String!, $password: String!) {
    cliToken(username: $username, password: $password)
  }
`
const POST_SUBMISSION = `
  mutation CreateSubmission($submission: SubmissionInput) {
    createSubmission(input: $submission) {
      id
      diff
      order
    }
`

module.exports = {
  GET_LESSONS,
  IS_TOKEN_VALID,
  GET_CLI_TOKEN,
  POST_SUBMISSION
}
