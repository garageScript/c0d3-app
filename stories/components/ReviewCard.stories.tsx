import React from 'react'
import ReviewCard from '../../components/ReviewCard'
export default {
  component: ReviewCard,
  title: 'Components/ReviewCard'
}

import { MockedProvider } from '@apollo/client/testing'
import ACCEPT_SUBMISSION from '../../graphql/queries/acceptSubmission'
import REJECT_SUBMISSION from '../../graphql/queries/rejectSubmission'
import { SubmissionStatus } from '../../graphql'
const mocks = [
  {
    request: {
      query: ACCEPT_SUBMISSION,
      variables: { id: '1', comment: 'good job' }
    },
    result: {
      data: {
        acceptSubmission: {
          id: '1',
          comment: 'good job'
        }
      }
    }
  },
  {
    request: {
      query: REJECT_SUBMISSION,
      variables: {
        id: '1',
        comment: 'error on line 3'
      }
    },
    result: {
      data: {
        rejectSubmission: {
          id: '1',
          comment: 'error on line 3'
        }
      }
    }
  }
]
const JsDiff =
  'diff --git a/js7/1.js b/js7/1.js\nindex 9c96b34..853bddf 100644\n--- a/js7/1.js\n+++ b/js7/1.js\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];|||foobar|||\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;\n--- a/js7/1.js\n+++ b/js7/1.js\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];|||foobar|||\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'
const BigDiff =
  "diff --git a/components/ReviewCard.tsx b/components/ReviewCard.tsx index 7dca9f6..e3ad96b 100644 --- a/components/ReviewCard.tsx +++ b/components/ReviewCard.tsx @@ -18,6 +18,7 @@ import _ from 'lodash'  import { Button } from './theme/Button'  import { Text } from './theme/Text'  import { MdInput } from './MdInput' +import { string } from 'yup'    dayjs.extend(relativeTime)   @@ -30,9 +31,11 @@ type DiffViewProps = {  }    const prismLanguages = ['js', 'javascript', 'html', 'css', 'json', 'jsx'] -  export const DiffView: React.FC<DiffViewProps> = ({ diff = '' }) => {    const files = gitDiffParser.parse(diff) +  console.log(files,'files') +  const [state, setState] = useState(files) +  console.log(files, 'files')      const renderFile = ({ hunks, newPath }: File) => {      const newValue: String[] = [] @@ -50,15 +53,27 @@ export const DiffView: React.FC<DiffViewProps> = ({ diff = '' }) => {        const syntaxHighlight = (str: string): any => {        if (!str) return - +      const comment = str.split('|||foobar')        const language = Prism.highlight(          str,          Prism.languages[extension],          extension        ) -      return <span dangerouslySetInnerHTML={{ __html: language }} /> +      console.log(str, str.split('|||foobar')) +      return ( +        <> +          <span +            dangerouslySetInnerHTML={{ +              __html: comment[1] ? comment[0] : language +            }} +          /> +          {comment[1] && ( +            <div style={{ backgroundColor: 'white' }}> FOOBAR</div> +          )} +        </> +      )      } - +    console.log(newValue, 'newlines')      return (        <ReactDiffViewer          key={_.uniqueId()} @@ -66,11 +81,14 @@ export const DiffView: React.FC<DiffViewProps> = ({ diff = '' }) => {          renderContent={syntaxHighlight}          splitView={false}          leftTitle={`${newPath}`} +        onLineNumberClick={n => { +          console.log(n) +        }}        />      )    }   -  return <>{files.map(renderFile)}</> +  return <>{state.map(renderFile)}</>  }    const MemoDiffView = memo(DiffView) @@ -114,7 +132,7 @@ export const ReviewCard: React.FC<ReviewCardProps> = ({ submissionData }) => {              <div className='card-body'>              <div className='rounded-lg overflow-hidden'> -              <MemoDiffView diff={diff} /> +              <DiffView diff={diff} />              </div>            </div>   diff --git a/stories/components/ReviewCard.stories.tsx b/stories/components/ReviewCard.stories.tsx index 1111a85..fad174d 100644 --- a/stories/components/ReviewCard.stories.tsx +++ b/stories/components/ReviewCard.stories.tsx @@ -43,7 +43,7 @@ const mocks = [    }  ]  const JsDiff = -  'diff --git a/js7/1.js b/js7/1.js\nindex 9c96b34..853bddf 100644\n--- a/js7/1.js\n+++ b/js7/1.js\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;' +  'diff --git a/js7/1.js b/js7/1.js\nindex 9c96b34..853bddf 100644\n--- a/js7/1.js\n+++ b/js7/1.js\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];|||foobar|||\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;\n--- a/js7/1.js\n+++ b/js7/1.js\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];|||foobar|||\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+"
const submissionData = {
  id: 1,
  status: SubmissionStatus.Open,
  mrUrl: '',
  diff: JsDiff,
  viewCount: 0,
  comment: 'Some comment',
  order: 0,
  challengeId: 146,
  lessonId: 2,
  user: {
    username: 'fake user',
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
    isAdmin: false
  },
  createdAt: '123',
  updatedAt: '123'
}

export const ActiveCard: React.FC = () => (
  <MockedProvider mocks={mocks}>
    <ReviewCard submissionData={submissionData} />
  </MockedProvider>
)
export const WithBigDiff: React.FC = () => (
  <MockedProvider mocks={mocks}>
    <ReviewCard submissionData={{ ...submissionData, diff: BigDiff }} />
  </MockedProvider>
)
export const NoDiffCard: React.FC = () => (
  <MockedProvider mocks={mocks}>
    <ReviewCard submissionData={{ ...submissionData, diff: '' }} />
  </MockedProvider>
)
