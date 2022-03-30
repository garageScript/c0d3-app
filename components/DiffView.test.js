import '../__mocks__/useIsMac.mock'
import '../__mocks__/useBreakpoint.mock'
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import DiffView from './DiffView'
import { SubmissionStatus } from '../graphql'
import { MockedProvider } from '@apollo/client/testing'
import getPreviousSubmissions from '../__dummy__/getPreviousSubmissionsData'

describe('DiffView component', () => {
  const dummySumissions = getPreviousSubmissions.getPreviousSubmissions
  test('Should render diff with comments', async () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DiffView
          submission={dummySumissions[2]}
          generalStatus={SubmissionStatus.Open}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
    expect(await screen.findByText('second line comment')).toBeVisible()
  })
  test('Should render collapsed diff', async () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DiffView
          submission={dummySumissions[0]}
          generalStatus={SubmissionStatus.Open}
        />
      </MockedProvider>
    )
    await waitFor(() => userEvent.click(screen.getByText('Viewed')))
    expect(container).toMatchSnapshot()
    expect(screen.queryByText('4')).toBeNull()
  })
  test('Should render diff with no comments', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DiffView submission={dummySumissions[0]} />
      </MockedProvider>
    )
    expect(screen.queryByText('Add comment')).toBeNull()
  })
  test('Should add comment box', async () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DiffView
          submission={dummySumissions[0]}
          generalStatus={SubmissionStatus.Open}
        />
      </MockedProvider>
    )
    await waitFor(() => userEvent.click(screen.getByText('4')))
    expect(container).toMatchSnapshot()
    expect(screen.getByText('Add comment')).toBeVisible()
  })
  test('Should remove comment box with no comments', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DiffView
          submission={dummySumissions[2]}
          generalStatus={SubmissionStatus.Open}
        />
      </MockedProvider>
    )
    //select fourth line of second file
    await waitFor(() => userEvent.click(screen.getAllByText('4')[1]))
    expect((await screen.findAllByText('Add comment')).length).toBe(3)
    await waitFor(() => userEvent.click(screen.getAllByText('4')[1]))
    expect((await screen.findAllByText('Add comment')).length).toBe(2)
  })
  test('Should not add comment is generalStatus is not open', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DiffView
          submission={dummySumissions[0]}
          generalStatus={SubmissionStatus.Passed}
        />
      </MockedProvider>
    )
    await waitFor(() => userEvent.click(screen.getByText('4')))
    expect(screen.queryByText('Add comment')).toBeNull()
  })

  test('Should render empty div if no diff is provided', () => {
    const noDiffSubmission = { ...dummySumissions[0], diff: null }
    const { container } = render(<DiffView submission={noDiffSubmission} />)
    expect(container.firstChild).toEqual(null)
  })
  test('Should default to javascript if language is not supported', () => {
    const cDiff =
      'diff --git a/js7/1.c b/js7/1.c\nindex 9c96b34..853bddf 100644\n--- a/js7/1.c\n+++ b/js7/1.c\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'
    render(
      <DiffView
        submission={{ ...dummySumissions[0], diff: cDiff, comments: undefined }}
        generalStatus={SubmissionStatus.Open}
      />
    )
    expect(screen.getByText('js7/1.c')).toBeVisible()
  })
  test('Should do nothing with incorrect diff', () => {
    const incorrectDiff =
      'diff --git \nindex 9c96b34..853bddf 100644\n---@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'
    render(
      <DiffView submission={{ ...dummySumissions[0], diff: incorrectDiff }} />
    )

    expect(screen.firstChild).toBeUndefined()
  })
})
