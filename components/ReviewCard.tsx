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

import rebuildDiff from '../helpers/rebuildDiff'

import styles from '../scss/reviewCard.module.scss'

dayjs.extend(relativeTime)

type ReviewCardProps = {
  submissionData: Submission
}

type DiffViewProps = {
  diff?: string
  lessonId: number
  challengeId: number
  userId: string
}

const CommentBox: React.FC<{
  line: number
  newPath: string
  files: File[]
  str: string
  lessonId: number
  challengeId: number
  userId: string
}> = ({ line, newPath, files, str, lessonId, challengeId, userId }) => {
  const [comments, setComments] = useState<String[]>([])
  const [input, setInput] = useState('')
  const updateFile = (
    _line: number,
    _newPath: string,
    _files: File[],
    str: string
  ) => {
    //there could be only one file with give path
    const edited = _files.filter(f => f.newPath === _newPath)
    const pre = str.split('|||withComment')[0]
    edited[0].hunks.map(h =>
      h.changes.map((c, i) => {
        if (c.content === pre) {
          h.changes[i].content = str
        }
      })
    )
    console.log(edited, 'updated')
    const copyFiles = [..._files]
    copyFiles.map((f, i) => {
      if (f.newPath === newPath) {
        _files[i] = edited[0]
      }
    })
    console.log(copyFiles, 'copiedFullFiles')
    rebuildDiff(copyFiles)
    console.log(lessonId, challengeId, userId, 'ID')
    //SEND BACK NEW DIFF
  }
  return (
    <div className="commentBox bg-white">
      {comments.map(c => (
        <p key={c.valueOf()}>{c}</p>
      ))}
      <input
        type="text"
        className="d-block"
        onChange={e => {
          setInput(e.target.value)
        }}
        id="commentBox__input"
        value={input}
      />
      <button
        className="button"
        onClick={() => {
          setComments([...comments, input])
          setInput('')
          updateFile(line, newPath, files, str)
        }}
      >
        <label htmlFor="commentBox__input">Comment</label>
      </button>
    </div>
  )
}
const prismLanguages = ['js', 'javascript', 'html', 'css', 'json', 'jsx']

export const DiffView: React.FC<DiffViewProps> = ({
  diff = '',
  lessonId,
  userId,
  challengeId
}) => {
  const files = gitDiffParser.parse(diff)

  const renderFile = ({ hunks, newPath }: File) => {
    const newValue: String[] = []
    const [innerState, setInnerState] = React.useState<String[]>([])
    let extension = newPath.split('.').pop() || prismLanguages[0]
    if (!hunks.length || !newPath) return
    if (!prismLanguages.includes(extension)) {
      extension = 'javascript'
    }
    useEffect(() => {
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
          {comment[1] && (
            <CommentBox
              line={Number.parseInt(comment[1].split('|||')[1])}
              newPath={newPath}
              files={files}
              str={str}
              lessonId={lessonId}
              challengeId={challengeId}
              userId={userId}
            />
          )}
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
          innerState.map((_, i) => {
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
type ReviewerProfileProps = {
  username: string | undefined | null
  name: string | undefined | null
}
const ReviewerProfile: React.FC<ReviewerProfileProps> = ({
  username,
  name
}) => {
  //TO-DO fix User type to make these fields non-nullable
  const firstName = name ? name.split(' ')[0] : ''
  const lastName = name?.split(' ')[1] || ''
  return (
    <a
      className={`${styles['comment_author']} mt-2 d-block`}
      href={username ? `/profile/${username}` : undefined}
    >
      <div className="d-inline">{`${firstName} ${lastName}`}</div>
      <div className="d-inline text-muted">
        {username ? ' @' + username : ''}
      </div>
    </a>
  )
}
export const ReviewCard: React.FC<ReviewCardProps> = ({ submissionData }) => {
  const {
    id,
    diff,
    comment,
    updatedAt,
    user,
    challenge,
    lessonId,
    reviewer,
    challengeId,
    userId
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
              {user?.username} -{' '}
              <span className="text-primary">{challenge?.title}</span>
            </h4>
            <Text color="lightgrey" size="sm">
              {dayjs(parseInt(updatedAt || '0')).fromNow()}
            </Text>
          </div>

          <div className="card-body">
            <div className="rounded-lg overflow-hidden">
              <MemoDiffView
                diff={diff}
                lessonId={lessonId}
                challengeId={challengeId}
                userId={userId!}
              />
            </div>
          </div>

          <div className="card-footer bg-white">
            {comment && (
              <div>
                <Markdown>{comment}</Markdown>
                <ReviewerProfile
                  username={reviewer?.username}
                  name={reviewer?.name}
                />
              </div>
            )}
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
