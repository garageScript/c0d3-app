import { SubmissionStatus } from '../graphql'

const submissionData = {
  id: 101,
  status: SubmissionStatus.Open,
  diff: 'diff --git a/js0/1.js b/js0/1.js\nindex d7dcc70..0eff076 100644\n--- a/js0/1.js\n+++ b/js0/1.js\n@@ -6,9 +6,7 @@\n  * @returns {number}\n  */\n \n-const solution = (num1, num2) => {\n-  return 0\n-}\n+const solution = (num1, num2) => num1 + num2\n \n module.exports = {\n   solution\n',
  comment: null,
  challenge: {
    title: 'Is First Num Bigger',
    description:
      "Write a function that takes in 2 numbers and returns true if the first number is greater than the second, false otherwise.\n\nHere's how another developer might use your function:\n\n```\nsolution(5,9) // Should return false\nsolution(4,1) // Should return true\n```",
    __typename: 'Challenge',
    id: 1
  },
  challengeId: 6,
  lessonId: 1,
  user: {
    id: 3,
    username: 'newbie',
    __typename: 'User'
  },
  reviewer: null,
  comments: [],
  createdAt: '1642275951816',
  updatedAt: '1642275951817',
  __typename: 'Submission'
}

export default submissionData
