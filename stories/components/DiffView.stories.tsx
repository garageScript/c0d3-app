import React from 'react'
import DiffView from '../../components/DiffView'
import { SubmissionStatus } from '../../graphql/'
import { MockedProvider } from '@apollo/client/testing'

export default {
  component: DiffView,
  title: 'Components/DiffView'
}

const submission = {
  status: SubmissionStatus.Open,
  id: 1,
  diff: `diff --git a/curriculum/js0/2.js b/curriculum/js0/2.js\nindex 647ca32..ac44196 100644\n--- a/curriculum/js0/2.js\n+++ b/curriculum/js0/2.js\n@@ -7,7 +7,7 @@\n  */\n \n const solution = (a, b, c) => {\n-  return 0;\n+  return a + b + c;\n };\n \n module.exports = {\n`,
  viewCount: 0,
  comment: '```test comment```',
  lessonId: 23,
  challengeId: 105,
  challenge: {
    id: 1,
    title: 'fake challenge',
    description: 'fake description',
    order: 1,
    lessonId: 23
  },
  user: {
    id: 1,
    username: 'fakeuser',
    name: 'fake user',
    email: 'fake@fakemail.com',
    isAdmin: false,
    discordUserId: '',
    discordUsername: '',
    discordAvatarUrl: '',
    isConnectedToDiscord: false
  },
  reviewerId: '',
  createdAt: '',
  updatedAt: Date.now().toString()
}

export const Default: React.FC = () => {
  return (
    <MockedProvider>
      <DiffView submission={submission} generalStatus={SubmissionStatus.Open} />
    </MockedProvider>
  )
}

export const Closed: React.FC = () => {
  return (
    <MockedProvider>
      <DiffView
        submission={{ ...submission, status: SubmissionStatus.Passed }}
        generalStatus={SubmissionStatus.Open}
      />
    </MockedProvider>
  )
}
