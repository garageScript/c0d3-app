import * as React from 'react'
import ChallengeMaterial from '../../components/ChallengeMaterial'

export default {
  component: ChallengeMaterial,
  title: 'Components/ChallengeMaterial'
}

const challenges = [
  {
    description:
      'Write a function that takes in a number and returns true if that number is greater than 5. Otherwise, return false.',
    id: '105',
    order: 0,
    title: 'Greater than 5'
  },
  {
    description:
      'Write a function that takes in 2 numbers and returns their sum.',
    id: '107',
    order: 1,
    title: 'Sum of 2 Numbers'
  }
]

const lessonStatus = {
  isEnrolled: '213423534',
  isTeaching: null
}

export const Basic: React.FC = () => (
  <ChallengeMaterial
    challenges={challenges}
    userSubmissions={[]}
    lessonStatus={lessonStatus}
    chatUrl="https://chat.c0d3.com/c0d3/channels/js0-foundations"
    lessonId="5"
  />
)

export const WithDiff: React.FC = () => (
  <ChallengeMaterial
    challenges={challenges}
    userSubmissions={[
      {
        status: '',
        id: '1',
        mrUrl: '',
        diff: `diff --git a/curriculum/js0/2.js b/curriculum/js0/2.js\nindex 647ca32..ac44196 100644\n--- a/curriculum/js0/2.js\n+++ b/curriculum/js0/2.js\n@@ -7,7 +7,7 @@\n  */\n \n const solution = (a, b, c) => {\n-  return 0;\n+  return a + b + c;\n };\n \n module.exports = {\n`,
        viewCount: 0,
        comment: '```test comment```',
        challengeId: '105',
        reviewerId: '',
        createdAt: '',
        updatedAt: ''
      },
      {
        status: '',
        id: '1',
        mrUrl: '',
        diff: `diff --git a/curriculum/js0/2.js b/curriculum/js0/2.js\nindex 647ca32..ac44196 100644\n--- a/curriculum/js0/2.js\n+++ b/curriculum/js0/2.js\n@@ -7,7 +7,7 @@\n  */\n \n const solution = (a, b, c) => {\n-  return 0;\n+  return a + b + c;\n };\n \n module.exports = {\n`,
        viewCount: 0,
        comment: '```test comment```',
        challengeId: '107',
        reviewerId: '',
        createdAt: '',
        updatedAt: ''
      }
    ]}
    lessonStatus={lessonStatus}
    chatUrl="https://chat.c0d3.com/c0d3/channels/js0-foundations"
    lessonId="5"
  />
)

export const WithComments: React.FC = () => (
  <ChallengeMaterial
    challenges={challenges}
    userSubmissions={[
      {
        status: 'passed',
        id: '1',
        mrUrl: '',
        diff: `diff --git a/curriculum/js0/2.js b/curriculum/js0/2.js\nindex 647ca32..ac44196 100644\n--- a/curriculum/js0/2.js\n+++ b/curriculum/js0/2.js\n@@ -7,7 +7,7 @@\n  */\n \n const solution = (a, b, c) => {\n-  return 0;\n+  return a + b + c;\n };\n \n module.exports = {\n`,
        viewCount: 0,
        comment: '```Great Job```',
        challengeId: '105',
        reviewer: {
          username: 'dan'
        },
        reviewerId: '1',
        createdAt: '',
        updatedAt: ''
      }
    ]}
    lessonStatus={lessonStatus}
    chatUrl="https://chat.c0d3.com/c0d3/channels/js0-foundations"
    lessonId="5"
  />
)

export const NoChallenges: React.FC = () => (
  <ChallengeMaterial
    challenges={[]}
    userSubmissions={[]}
    lessonStatus={lessonStatus}
    chatUrl="https://chat.c0d3.com/c0d3/channels/js0-foundations"
    lessonId="5"
  />
)
