/**
 * @jest-environment node
 */

import { updateCache } from './updateCache'
import { InMemoryCache } from '@apollo/client'
import GET_SUBMISSIONS from '../graphql/queries/getSubmissions'
import GET_APP from '../graphql/queries/getApp'
import dummySessionData from '../__dummy__/sessionData'
import dummyLessonData from '../__dummy__/lessonData'
import dummyAlertData from '../__dummy__/alertData'
import { SubmissionStatus } from '../graphql'

const submission = {
  id: 0,
  status: SubmissionStatus.Open,
  mrUrl: '',
  diff: 'diff --git a/js7/1.js b/js7/1.js\nindex 9c96b34..853bddf 100644\n--- a/js7/1.js\n+++ b/js7/1.js\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;\n',
  viewCount: 0,
  comment: 'Some comment',
  order: 0,
  challengeId: 146,
  lessonId: 2,
  user: {
    username: 'fake user',
    name: 'fake student',
    email: 'fake@fakemail.com',
    id: 1,
    isAdmin: false
  },
  challenge: {
    id: 23,
    title: 'fake challenge',
    description: 'fake description',
    lessonId: 2,
    order: 1
  },
  reviewer: {
    id: 1,
    username: 'fake reviewer',
    name: 'fake reviewer',
    email: 'fake@fakemail.com',
    isAdmin: false
  },
  createdAt: '123',
  updatedAt: '123',
  comments: []
}
const submissionsData = [submission, { ...submission, id: 1 }]
describe('updateCache helper', () => {
  it('should update Get_APP cache', () => {
    const cache = new InMemoryCache({ addTypename: false })
    cache.writeQuery({
      query: GET_APP,
      data: {
        lessons: dummyLessonData,
        alerts: dummyAlertData,
        session: {
          ...dummySessionData,
          submissions: submissionsData
        }
      }
    })
    updateCache(0, 'Test comment!', 'Test User', 'testuser')(cache)
  })
  it('should update Get_Submissions cache', () => {
    const cache = new InMemoryCache({ addTypename: false })
    cache.writeQuery({
      query: GET_SUBMISSIONS,
      variables: { lessonId: 2 },
      data: { submissions: submissionsData }
    })
    updateCache(0, 'Test comment!', 'Test User', 'testuser', 2)(cache)
  })
})
