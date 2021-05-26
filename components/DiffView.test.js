import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import DiffView from './DiffView'
import { MockedProvider } from '@apollo/client/testing'

describe('DiffView component', () => {
  const diff =
    'diff --git a/js7/1.js b/js7/1.js\nindex 9c96b34..853bddf 100644\n--- a/js7/1.js\n+++ b/js7/1.js\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'
  const comments = [
    {
      content: 'First Comment',
      createdAt: '1620762267819',
      fileName: 'js7/1.js',
      submissionId: 1,
      authorId: 3,
      line: 4,
      author: {
        username: 'newbie',
        name: 'Noob Newbie'
      }
    },
    {
      content: 'Second Comment',
      createdAt: '1620762275096',
      fileName: 'js7/1.js',
      submissionId: 1,
      authorId: 3,
      line: 4,
      author: {
        username: 'newbie',
        name: 'Noob Newbie'
      }
    },
    {
      content: 'Second Comment',
      createdAt: '1620762275096',
      fileName: 'js7/1.js',
      submissionId: 1,
      authorId: 3,
      line: 5,
      author: {
        username: 'admin',
        name: 'Admin Admin'
      }
    }
  ]
  test('Should render diff with comments', () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DiffView
          diff={diff}
          comments={comments}
          name="Noob Newbie"
          username="newbie"
          id={1}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
    userEvent.click(screen.getByText('4'))
    userEvent.click(screen.getByText('6'))
    expect(screen.getByText('First Comment')).toBeVisible()
  })
  test('Should add comment box', () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DiffView
          diff={diff}
          comments={[]}
          name="Noob Newbie"
          username="newbie"
          id={1}
        />
      </MockedProvider>
    )
    userEvent.click(screen.getByText('4'))
    expect(container).toMatchSnapshot()
    expect(screen.getByText('Add comment')).toBeVisible()
  })
  test('Should remove comment box with no comments', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DiffView
          diff={diff}
          comments={[]}
          name="Noob Newbie"
          username="newbie"
          id={1}
        />
      </MockedProvider>
    )
    userEvent.click(screen.getByText('4'))
    expect(screen.getByText('Add comment')).toBeVisible()
    userEvent.click(screen.getByText('4'))
    expect(screen.queryByText('Add comment')).toBeFalsy()
  })
  test('Should not add comment box if submission was accepted', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DiffView
          diff={diff}
          comments={[]}
          name="Noob Newbie"
          username="newbie"
          id={1}
          status="passed"
        />
      </MockedProvider>
    )
    userEvent.click(screen.getByText('4'))
    expect(screen.queryByText('Add comment')).toBeFalsy()
  })
  test('Should render empty div if no diff is provided', () => {
    const { container } = render(
      <DiffView comments={comments} name="Noob Newbie" username="newbie" />
    )
    expect(container.firstChild).toEqual(null)
  })
  test('Should default to javascript if language is not supported', () => {
    const cDiff =
      'diff --git a/js7/1.c b/js7/1.c\nindex 9c96b34..853bddf 100644\n--- a/js7/1.c\n+++ b/js7/1.c\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'
    render(
      <DiffView
        comments={comments}
        diff={cDiff}
        name="Noob Newbie"
        username="newbie"
      />
    )
    expect(screen.getByText('js7/1.c')).toBeVisible()
  })
  test('Should do nothing with incorrect diff', () => {
    const incorrectDiff =
      'diff --git \nindex 9c96b34..853bddf 100644\n---@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'
    render(
      <DiffView
        comments={comments}
        diff={incorrectDiff}
        name="Noob Newbie"
        username="newbie"
      />
    )

    expect(screen.firstChild).toBeUndefined()
  })
})
