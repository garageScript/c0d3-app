import { updateCache } from './updateCache'
import { InMemoryCache } from '@apollo/client'
import GET_SUBMISSIONS from '../graphql/queries/getSubmissions'
import GET_APP from '../graphql/queries/getApp'
import GET_PREVIOUS_SUBMISSIONS from '../graphql/queries/getPreviousSubmissions'
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
  it('should update previous submissions in cache', () => {
    const cache = new InMemoryCache({ addTypename: false })
    cache.writeQuery({
      query: GET_PREVIOUS_SUBMISSIONS,
      variables: { userId: 1, challengeId: 23 },
      data: { getPreviousSubmissions: submissionsData }
    })
    updateCache(
      0,
      undefined,
      'Test comment!',
      'Test User',
      'testuser',
      2,
      undefined,
      undefined,
      23,
      1
    )(cache)
  })
  it('should throw an error if there is no cache to update', () => {
    const cache = new InMemoryCache({ addTypename: false })
    expect(() => {
      updateCache(
        0,
        undefined,
        'Test comment!',
        'Test User',
        'testuser',
        2,
        undefined,
        undefined,
        23,
        1
      )(cache)
    }).toThrow('No cache to update')
  })
  it('should throw if no submission is found', () => {
    const cache = new InMemoryCache({ addTypename: false })
    cache.writeQuery({
      query: GET_PREVIOUS_SUBMISSIONS,
      variables: { userId: 1, challengeId: 23 },
      data: { getPreviousSubmissions: submissionsData }
    })
    expect(() =>
      updateCache(
        11,
        undefined,
        'Test comment!',
        'Test User',
        'testuser',
        2,
        undefined,
        undefined,
        23,
        1
      )(cache)
    ).toThrow('Incorrect submission id (no submission was found)')
  })
  it('should delete previous submission comment in cache', () => {
    const cache = new InMemoryCache({ addTypename: false })
    cache.writeQuery({
      query: GET_PREVIOUS_SUBMISSIONS,
      variables: { userId: 1, challengeId: 23 },
      data: { getPreviousSubmissions: submissionsData }
    })
    expect(() => {
      updateCache(
        11,
        1,
        1,
        'Test comment!',
        'Test User',
        'testuser',
        2,
        undefined,
        undefined,
        23,
        1
      )(cache)
    })
  })
})
