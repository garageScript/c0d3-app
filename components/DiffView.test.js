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
  test('Should set JSX syntax if language is HTML', async () => {
    const cDiff =
      "diff --git a/js5/public/index.html b/js5/public/index.html\nnew file mode 100644\nindex 0000000..9d4ae75\n--- /dev/null\n+++ b/js5/public/index.html\n@@ -0,0 +1,142 @@\n+<html>\n+\n+<head>\n+  <meta charset=\"UTF-8\">\n+  <link rel=\"stylesheet\" type=\"text/css\" href=\"4.css\">\n+</head>\n+\n+<body>\n+  <div class=\"container\">\n+  </div>\n+<script>\n+  const container = document.querySelector('.container');\n+\n+function CreateLightsOff(value) {\n+  this.value = value;\n+  this.colsElements = [];\n+\n+  // All marks counter used for winning condition\n+  this.marks = 1;\n+\n+  const changeMark = neighborElement => {\n+    if (neighborElement.value.includes('mark')) {\n+      neighborElement.remove('mark');\n+      this.marks -= 1;\n+    } else {\n+      neighborElement.add('mark');\n+      this.marks += 1;\n+    }\n+  };\n+\n+  const allMarked = () => {\n+    if (this.value * this.value - this.marks === this.value * this.value) {\n+      const answer = parseInt(\n+        prompt(\n+          'Congrats! Type your next challenge number: (type 0 to stop playing)'\n+        )\n+      );\n+\n+      // Returns NaN (for other types) or number\n+      if (answer) {\n+        container.innerHTML = '';\n+        CreateLightsOff(answer);\n+      }\n+    }\n+  };\n+\n+  const modifyColsElements = (index, currentCol) => {\n+    const currentElementClass = this.colsElements[currentCol].children[index]\n+      .classList;\n+\n+    if (!currentElementClass.value.includes('mark')) {\n+      return;\n+    }\n+\n+    let topNeighbor;\n+\n+    if (this.colsElements[currentCol - 1]) {\n+      topNeighbor = this.colsElements[currentCol - 1].children[index].classList;\n+      changeMark(topNeighbor);\n+    }\n+\n+    let bottomNeighbor;\n+\n+    if (this.colsElements[currentCol + 1]) {\n+      bottomNeighbor = this.colsElements[currentCol + 1].children[index]\n+        .classList;\n+      changeMark(bottomNeighbor);\n+    }\n+\n+    let rightNeighbor;\n+\n+    if (this.colsElements[currentCol].children[index + 1]) {\n+      rightNeighbor = this.colsElements[currentCol].children[index + 1]\n+        .classList;\n+      changeMark(rightNeighbor);\n+    }\n+\n+    let leftNeighbor;\n+\n+    if (this.colsElements[currentCol].children[index - 1]) {\n+      leftNeighbor = this.colsElements[currentCol].children[index - 1]\n+        .classList;\n+      changeMark(leftNeighbor);\n+    }\n+\n+    currentElementClass.remove('mark');\n+    this.marks -= 1;\n+\n+    allMarked();\n+  };\n+\n+  const generateRows = (colCount, currentCol, i = 0, rows = []) => {\n+    if (i === colCount) return rows;\n+\n+    const block = document.createElement('div');\n+    block.classList.add('block');\n+\n+    block.addEventListener('click', () => {\n+      modifyColsElements(i, currentCol);\n+    });\n+\n+    rows.push(block);\n+\n+    return generateRows(colCount, currentCol, i + 1, rows);\n+  };\n+\n+  const generateColumns = (\n+    col,\n+    i = 0,\n+    randomIndex = Math.floor(Math.random() * col)\n+  ) => {\n+    if (i === col) return;\n+\n+    const rows = generateRows(col, i);\n+\n+    const colContainer = document.createElement('div');\n+    colContainer.classList.add('row', `row-${i}`);\n+\n+    rows.forEach(e => colContainer.append(e));\n+\n+    if (i === randomIndex) {\n+      const colChildren = colContainer.children;\n+      colChildren[randomIndex].classList.add('mark');\n+    }\n+\n+    this.colsElements.push(colContainer);\n+\n+    container.append(colContainer);\n+\n+    return generateColumns(col, i + 1, randomIndex);\n+  };\n+\n+  if (this.value) {\n+    generateColumns(this.value);\n+  }\n+}\n+\n+const g = new CreateLightsOff(2);\n+</script>\n+</body>\n+\n+</html>\n"
    render(
      <DiffView
        submission={{ ...dummySumissions[0], diff: cDiff, comments: undefined }}
        generalStatus={SubmissionStatus.Open}
      />
    )
    expect(screen.getAllByText('CreateLightsOff')[0]).toHaveStyle({
      color: 'rgb(221, 74, 104);'
    })
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
