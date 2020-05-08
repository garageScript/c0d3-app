export const GET_LESSONS = `
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
export const IS_TOKEN_VALID = `
  query isTokenValid($cliToken: String!) {
    isTokenValid(cliToken: $cliToken)
  }
`
export const GET_CLI_TOKEN = `
  query cliToken($username: String!, $password: String!) {
    cliToken(username: $username, password: $password)
  }
`
export const POST_SUBMISSION = `
  mutation createSubmission(
    $lessonId: String!
    $challengeId: String!
    $cliToken: String!
    $diff: String!
  ) {
    createSubmission(
      lessonId: $lessonId
      challengeId: $challengeId
      cliToken: $cliToken
      diff: $diff
    ) {
      id
      diff
    }
  }
`
