import React from 'react'
import DiffView from '../../components/DiffView'
import { Comment } from '../../graphql/'
import { MockedProvider } from '@apollo/client/testing'

export default {
  component: DiffView,
  title: 'Components/DiffView'
}

const JsDiff =
  'diff --git a/js7/1.js b/js7/1.js\nindex 9c96b34..853bddf 100644\n--- a/js7/1.js\n+++ b/js7/1.js\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'
const comments: Comment[] = [
  {
    content: 'First Comment',
    createdAt: '1620762267819',
    authorId: 3,
    line: 4,
    author: {
      username: 'newbie',
      name: 'Noob Newbie',
      id: 1,
      email: '',
      isAdmin: false
    },
    id: 1,
    fileName: 'js7/1.js',
    submissionId: 1
  },
  {
    content: 'Second Comment',
    createdAt: '1620762275096',
    authorId: 3,
    line: 4,
    author: {
      username: 'newbie',
      name: 'Noob Newbie',
      id: 1,
      email: '',
      isAdmin: false
    },
    id: 2,
    fileName: 'js7/1.js',
    submissionId: 1
  },
  {
    content: 'Third Comment',
    createdAt: '1620762275096',
    authorId: 3,
    line: 5,
    author: {
      username: 'admin',
      name: 'Admin Admin',
      id: 2,
      email: '',
      isAdmin: true
    },
    id: 3,
    fileName: 'js7/1.js',
    submissionId: 1
  }
]
export const Default: React.FC = () => {
  return (
    <MockedProvider>
      <DiffView diff={JsDiff} comments={comments} id={1} />
    </MockedProvider>
  )
}

export const Closed: React.FC = () => {
  return (
    <MockedProvider>
      <DiffView diff={JsDiff} comments={comments} id={1} status="passed" />
    </MockedProvider>
  )
}
