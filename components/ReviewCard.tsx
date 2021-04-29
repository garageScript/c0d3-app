import { useMutation } from '@apollo/client'

import React, { memo, useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx'
import gitDiffParser, { File } from 'gitdiff-parser'
import ReactDiffViewer from 'react-diff-viewer'

import Prism from 'prismjs'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import ACCEPT_SUBMISSION from '../graphql/queries/acceptSubmission'
import REJECT_SUBMISSION from '../graphql/queries/rejectSubmission'
import { Submission } from '../graphql/index'

import _ from 'lodash'

import { Button } from './theme/Button'
import { Text } from './theme/Text'
import { MdInput } from './MdInput'

dayjs.extend(relativeTime)

type ReviewCardProps = {
  submissionData: Submission
}

type DiffViewProps = {
  diff?: string
}
const CommentBox: React.FC = () => {
  const [comments, setComments] = useState<String[]>([])
  const [input, setInput] = useState('')
  return (
    <div className="commentBox bg-white">
      {comments.map(c => (
        <p>{c}</p>
      ))}
      <input
        type="text"
        className="commentBox__input d-block"
        onChange={e => {
          setInput(e.target.value)
        }}
        value={input}
      />
      <button
        className="button"
        onClick={() => {
          setComments([...comments, input])
          setInput('')
        }}
      >
        Comment
      </button>
    </div>
  )
}
const prismLanguages = ['js', 'javascript', 'html', 'css', 'json', 'jsx']
export const DiffView: React.FC<DiffViewProps> = ({ diff = '' }) => {
  const files = gitDiffParser.parse(diff)

  const renderFile = ({ hunks, newPath }: File) => {
    const newValue: String[] = []
    const [innerState, setInnerState] = React.useState<String[]>([])
    let extension = newPath.split('.').pop() || prismLanguages[0]
    useEffect(() => {
      if (!hunks.length || !newPath) return
      if (!prismLanguages.includes(extension)) {
        extension = 'javascript'
      }

      hunks.forEach(hunk => {
        hunk.changes.forEach(change => {
          if (!change.isDelete) newValue.push(change.content)
        })
      })
      setInnerState(newValue)
    }, [])

    const syntaxHighlight = (str: string): any => {
      if (!str) return
      const comment = str.split('|||withComment')
      const language = Prism.highlight(
        str,
        Prism.languages[extension],
        extension
      )
      return (
        <>
          <span
            dangerouslySetInnerHTML={{
              __html: comment[1] ? comment[0] : language
            }}
          />
          {comment[1] && <CommentBox />}
        </>
      )
    }
    return (
      <ReactDiffViewer
        key={_.uniqueId()}
        newValue={innerState.join('\n')}
        renderContent={syntaxHighlight}
        splitView={false}
        leftTitle={`${newPath}`}
        onLineNumberClick={n => {
          innerState.map((s, i) => {
            if (i + 1 === Number.parseInt(n.split('-')[1])) {
              const copy = [...innerState]
              copy[i] = innerState[i] + `|||withComment|||${i + 1}`
              setInnerState(copy)
            }
          })
        }}
      />
    )
  }

  return <>{files.map(renderFile)}</>
}

const MemoDiffView = memo(DiffView)

export const ReviewCard: React.FC<ReviewCardProps> = ({ submissionData }) => {
  const {
    id,
    diff,
    comment,
    updatedAt,
    user: { username },
    challenge: { title },
    lessonId
  } = submissionData
  const [commentValue, setCommentValue] = useState('')
  const [accept] = useMutation(ACCEPT_SUBMISSION)
  const [reject] = useMutation(REJECT_SUBMISSION)

  const reviewSubmission = (review: any) => async () => {
    await review({
      variables: {
        submissionId: id,
        lessonId,
        comment: commentValue
      }
    })
  }

  return (
    <>
      {diff && (
        <div className="card shadow-sm border-0 mt-3">
          <div className="card-header bg-white">
            <h4>
              {username} - <span className="text-primary">{title}</span>
            </h4>
            <Text color="lightgrey" size="sm">
              {dayjs(parseInt(updatedAt)).fromNow()}
            </Text>
          </div>

          <div className="card-body">
            <div className="rounded-lg overflow-hidden">
              <DiffView diff={diff} />
            </div>
          </div>

          <div className="card-footer bg-white">
            {comment && <Markdown>{comment}</Markdown>}
            <MdInput onChange={setCommentValue} bgColor={'white'} />
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
