import React from 'react'
import SelectIteration from './SelectIteration'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { ApolloError } from '@apollo/client'

describe('SelectIteration component', () => {
  const data = {
    getPreviousSubmissions: [
      {
        __typename: 'Submission',
        id: 104,
        status: 'needMoreWork',
        diff: 'diff --git a/js0/1.js b/js0/1.js\nindex d7dcc70..0eff076 100644\n--- a/js0/1.js\n+++ b/js0/1.js\n@@ -6,9 +6,7 @@\n  * @returns {number}\n  */\n \n-const solution = (num1, num2) => {\n-  return 0\n-}\n+const solution = (num1, num2) => num1 + num2\n \n module.exports = {\n   solution\n',
        comment: null,
        challenge: {
          __typename: 'Challenge',
          title: 'Functional 3 Sum'
        },
        challengeId: 9,
        lessonId: 1,
        user: {
          __typename: 'User',
          id: 3,
          username: 'newbie'
        },
        reviewer: null,
        comments: [],
        createdAt: '1623327769302',
        updatedAt: '1624356277645'
      },
      {
        __typename: 'Submission',
        id: 107,
        status: 'open',
        diff: 'diff --git a/foobar.js b/foobar.js\nnew file mode 100644\nindex 0000000..473b871\n--- /dev/null\n+++ b/foobar.js\n@@ -0,0 +1,32 @@\n+/*\n+SUBMISSION B\n+THIS IS A MOCK SUBMISSION TO TEST COMMENTS\n+\n+DO NOT CLOSE IT, PLEASE\n+*/\n+\n+const fetch = require("node-fetch");\n+\n+const fs = require("fs");\n+\n+fetch("https://pokeapi.co/api/v2/pokemon/")\n+  .then((data) => {\n+    return data.json();\n+  })\n+  .then((data) => {\n+    const fetchPromises = data.results.map((e) => {\n+      return fetch(e.url).then((info) => {\n+        return info.json();\n+      });\n+    });\n+\n+    Promise.all(fetchPromises)\n+      .then((result) => {\n+        return result.reduce((acc, pokeInfo) => {\n+          return `${acc}<p>${pokeInfo.name}</p><img src="${pokeInfo.sprites.front_default}"/>`;\n+        }, ``);\n+      })\n+      .then((htmlStr) => {\n+        fs.writeFile("9.html", htmlStr, () => {});\n+      });\n+  });\ndiff --git a/js7/10.js b/js7/10.js\nindex dda5c78..30e3ba2 100644\n--- a/js7/10.js\n+++ b/js7/10.js\n@@ -1,5 +1,37 @@\n-const parseJSON = (str) => {\n-  return {};\n+const parse = (str) => {\n+  //assume that str is always valid json string\n+  parseObj = (str) => {\n+    const output = {};\n+    if (str.length < 3) return output;\n+    const valueStr = str.slice(1, str.length - 1);\n+    let start = 0;\n+    let key;\n+    let val;\n+    for (let i = 0; i <= valueStr.length; i++) {\n+      if (stack[stack.length - 1] === valueStr[i]) {\n+        stack.pop();\n+      }\n+      if (valueStr[i] === "{") {\n+        stack.push("}");\n+      }\n+      if (!stack.length) {\n+        if (valueStr[i] === ":") {\n+          key = parse(valueStr.slice(start, i));\n+          start = i + 1;\n+        }\n+        if (valueStr[i] === "," || i === valueStr.length) {\n+          val = parse(valueStr.slice(start, i));\n+          start = i + 1;\n+          output[key] = val;\n+        }\n+      }\n+    }\n+    return output;\n+  };\n+  const stack = [];\n+  if (str[0] === \'"\') return str.slice(1, str.length - 1);\n+  if (str.charCodeAt(0) >= 48 && str.charCodeAt(0) <= 57) return Number(str);\n+  if (str[0] === "{") return parseObj(str);\n };\n \n-module.exports = parseJSON;\n+module.exports = parse;\n',
        comment: null,
        challenge: {
          __typename: 'Challenge',
          title: 'Functional 3 Sum'
        },
        challengeId: 9,
        lessonId: 1,
        user: {
          __typename: 'User',
          id: 3,
          username: 'newbie'
        },
        reviewer: null,
        comments: [],
        createdAt: '1624355888876',
        updatedAt: '1624355888876'
      },
      {
        __typename: 'Submission',
        id: 108,
        status: 'open',
        diff: 'diff --git a/foobar.js b/foobar.js\nnew file mode 100644\nindex 0000000..473b871\n--- /dev/null\n+++ b/foobar.js\n@@ -0,0 +1,32 @@\n+/*\n+SUBMISSION B\n+THIS IS A MOCK SUBMISSION TO TEST COMMENTS\n+\n+DO NOT CLOSE IT, PLEASE\n+*/\n+\n+const fetch = require("node-fetch");\n+\n+const fs = require("fs");\n+\n+fetch("https://pokeapi.co/api/v2/pokemon/")\n+  .then((data) => {\n+    return data.json();\n+  })\n+  .then((data) => {\n+    const fetchPromises = data.results.map((e) => {\n+      return fetch(e.url).then((info) => {\n+        return info.json();\n+      });\n+    });\n+\n+    Promise.all(fetchPromises)\n+      .then((result) => {\n+        return result.reduce((acc, pokeInfo) => {\n+          return `${acc}<p>${pokeInfo.name}</p><img src="${pokeInfo.sprites.front_default}"/>`;\n+        }, ``);\n+      })\n+      .then((htmlStr) => {\n+        fs.writeFile("9.html", htmlStr, () => {});\n+      });\n+  });\ndiff --git a/js7/10.js b/js7/10.js\nindex dda5c78..30e3ba2 100644\n--- a/js7/10.js\n+++ b/js7/10.js\n@@ -1,5 +1,37 @@\n-const parseJSON = (str) => {\n-  return {};\n+const parse = (str) => {\n+  //assume that str is always valid json string\n+  parseObj = (str) => {\n+    const output = {};\n+    if (str.length < 3) return output;\n+    const valueStr = str.slice(1, str.length - 1);\n+    let start = 0;\n+    let key;\n+    let val;\n+    for (let i = 0; i <= valueStr.length; i++) {\n+      if (stack[stack.length - 1] === valueStr[i]) {\n+        stack.pop();\n+      }\n+      if (valueStr[i] === "{") {\n+        stack.push("}");\n+      }\n+      if (!stack.length) {\n+        if (valueStr[i] === ":") {\n+          key = parse(valueStr.slice(start, i));\n+          start = i + 1;\n+        }\n+        if (valueStr[i] === "," || i === valueStr.length) {\n+          val = parse(valueStr.slice(start, i));\n+          start = i + 1;\n+          output[key] = val;\n+        }\n+      }\n+    }\n+    return output;\n+  };\n+  const stack = [];\n+  if (str[0] === \'"\') return str.slice(1, str.length - 1);\n+  if (str.charCodeAt(0) >= 48 && str.charCodeAt(0) <= 57) return Number(str);\n+  if (str[0] === "{") return parseObj(str);\n };\n \n-module.exports = parseJSON;\n+module.exports = parse;\n',
        comment: null,
        challenge: {
          __typename: 'Challenge',
          title: 'Functional 3 Sum'
        },
        challengeId: 9,
        lessonId: 1,
        user: {
          __typename: 'User',
          id: 3,
          username: 'newbie'
        },
        reviewer: null,
        comments: [
          {
            __typename: 'Comment',
            content: '1111',
            submissionId: 108,
            createdAt: '1624433720838',
            authorId: 1,
            line: 2,
            fileName: 'js0/1.js',
            author: {
              __typename: 'User',
              username: 'admin',
              name: 'Admin Administrator'
            }
          },
          {
            __typename: 'Comment',
            content: 'hgdhdhdh',
            submissionId: 108,
            createdAt: '1624433879292',
            authorId: 1,
            line: 1,
            fileName: 'js0/1.js',
            author: {
              __typename: 'User',
              username: 'admin',
              name: 'Admin Administrator'
            }
          }
        ],
        createdAt: '1624356277655',
        updatedAt: '1624356277655'
      }
    ]
  }
  test('Should be able to select submissions', async () => {
    const setIndex = jest.fn()
    const setSubmission = jest.fn()
    const { container } = render(
      <SelectIteration
        setIndex={setIndex}
        setSubmission={setSubmission}
        loading={false}
        data={data}
        error={undefined}
        currentId={107}
        currentIndex={1}
      />
    )
    await userEvent.click(screen.getByTestId('iteration 1'))
    expect(setIndex).toBeCalled()
    expect(setSubmission).toBeCalled()
    expect(container).toMatchSnapshot()
  })
  test('Should treat negative index as last iteration', () => {
    const { container } = render(
      <SelectIteration
        setIndex={() => {}}
        setSubmission={() => {}}
        loading={false}
        data={data}
        error={undefined}
        currentId={107}
        currentIndex={-1}
      />
    )
    expect(
      screen.getByRole('button', { name: '3 2 comment count' })
    ).toBeVisible()
    expect(container).toMatchSnapshot()
  })
  test('It should render loading state', () => {
    const { container } = render(
      <SelectIteration
        setIndex={() => {}}
        setSubmission={() => {}}
        loading={true}
        data={undefined}
        error={undefined}
        currentId={107}
        currentIndex={2}
      />
    )
    expect(screen.getByText('Loading previous submissions...')).toBeVisible()
    expect(container).toMatchSnapshot()
  })
  test('It should render error state', () => {
    const connectionError = new TypeError('Oops! Something went wrong.')
    const error = new ApolloError({ networkError: connectionError })
    const { container } = render(
      <SelectIteration
        setIndex={() => {}}
        setSubmission={() => {}}
        loading={undefined}
        data={undefined}
        error={error}
        currentId={107}
        currentIndex={2}
      />
    )

    expect(screen.getByText('Oops! Something went wrong.')).toBeVisible()
    expect(container).toMatchSnapshot()
  })
})
