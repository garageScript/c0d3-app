import React, { useState } from 'react'

import Markdown from 'markdown-to-jsx'
import gitDiffParser, { File } from 'gitdiff-parser'
import ReactDiffViewer from 'react-diff-viewer'
import Prism from 'prismjs'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { useMutation } from '@apollo/react-hooks'
import { ACCEPT_SUBMISSION, REJECT_SUBMISSION } from '../graphql/queries'
import { SubmissionData } from '../@types/submission'

import _ from 'lodash'

import { Button } from './theme/Button'
import { Text } from './theme/Text'

dayjs.extend(relativeTime)

type ReviewCardProps = {
  submissionData: SubmissionData
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ submissionData }) => {
  const {
    id,
    diff,
    comment,
    updatedAt,
    user: { username }
  } = submissionData
  const [commentValue, setCommentValue] = useState('')
  const [accept] = useMutation(ACCEPT_SUBMISSION)
  const [reject] = useMutation(REJECT_SUBMISSION)
  let files: File[] = []

  if (diff) files = gitDiffParser.parse(diff)

  const reviewSubmission = (review: any) => async () => {
    await review({
      variables: {
        submissionId: id,
        comment: commentValue
      }
    })
  }

  const renderFile = ({ hunks, newPath }: File) => {
    const newValue: String[] = []

    hunks.forEach(hunk => {
      hunk.changes.forEach(change => {
        if (!change.isDelete) newValue.push(change.content)
      })
    })

    const syntaxHighlight = (str: string): any => {
      if (!str) return

      const language = Prism.highlight(
        str,
        Prism.languages.javascript,
        'javascript'
      )
      return <span dangerouslySetInnerHTML={{ __html: language }} />
    }

    return (
      <ReactDiffViewer
        key={_.uniqueId()}
        newValue={newValue.join('\n')}
        renderContent={syntaxHighlight}
        splitView={false}
        leftTitle={`${newPath}`}
      />
    )
  }

  return (
    <>
      {diff && (
        <div className="card shadow-sm border-0 mt-3">
          <div className="card-header bg-white">
            <Text color="darkgrey" bold>
              {username}
            </Text>
            <Text color="lightgrey" size="sm">
              {dayjs(parseInt(updatedAt)).fromNow()}
            </Text>
          </div>

          <div className="card-body">
            <div className="rounded-lg overflow-hidden">
              {files.map(renderFile)}
            </div>
          </div>

          <div className="card-footer bg-white">
            {comment && <Markdown>{comment}</Markdown>}
            <textarea
              value={commentValue}
              onChange={e => setCommentValue(e.target.value)}
              placeholder="Type something..."
              style={{ width: '100%', padding: '1rem' }}
            ></textarea>
            <Button
              m="1"
              type="success"
              color="white"
              onClick={reviewSubmission(accept)}
            >
              Accept
            </Button>

            <Button
              m="1"
              type="danger"
              color="white"
              onClick={reviewSubmission(reject)}
            >
              Reject
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewCard
