import React, { useState } from 'react'
import styles from './discussionsCard.module.scss'
import {
  CommentIcon,
  TrashIcon,
  PencilIcon,
  ChecklistIcon,
  CircleSlashIcon,
  PaperAirplaneIcon
} from '@primer/octicons-react'
import { MdInput } from '../MdInput'

export type DiscussionReply = {
  //placeholder for DiscussionReply type, subject to change once we finalize structure of backend data
  username: string
  userPic: string
  timeStamp: string
  content: string
  likes?: number
  dislikes?: number
  replies?: Array<DiscussionReply>
}

export type DiscussionsCardProps = {
  isMain: boolean
  username: string
  userPic: string
  timeStamp: string
  content: string
  likes?: number
  dislikes?: number
  replies?: Array<DiscussionReply>
  replyClick?: () => void //potentially delete replyClick, editClick, deleteClick from Props and declare and handle these in the component
  editClick?: () => void
  deleteClick: () => void
}

const DiscussionsCard: React.FC<DiscussionsCardProps> = ({
  isMain,
  username,
  userPic,
  timeStamp,
  content,
  deleteClick
}) => {
  const [replyMode, setReplyMode] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [editText, setEditText] = useState('')

  const replyClick = () => {
    setReplyMode(true)
  }
  const cancelReply = () => {
    setReplyMode(false)
    setReplyText('')
  }
  const editClick = () => {
    setEditMode(true)
    setEditText(content)
  }

  const cancelEdit = () => {
    setEditMode(false)
    setEditText('')
  }

  const replyBox = //onclick function for send has yet to be implemented, will be in future PR
    (
      <div className={styles.reply_box}>
        <MdInput value={replyText} onChange={setReplyText} />
        <button
          className={styles.cancel_reply}
          onClick={cancelReply}
          data-testid="cancel_reply"
        >
          <CircleSlashIcon size={15} />
          <span> </span>
          Cancel
        </button>
        <button className={styles.send_reply}>
          <PaperAirplaneIcon size={15} />
          <span> </span>
          Send
        </button>
      </div>
    )
  const editBox = //onclick function for save has yet to be implemented, will be in future PR
    (
      <div className={styles.edit_box}>
        <MdInput value={editText} onChange={setEditText} />
        <div className={styles.edit_buttons}>
          <button
            onClick={cancelEdit}
            className={styles.discard_edit}
            data-testid="cancel_edit"
          >
            <TrashIcon size={15} />
            <span> </span>
            Discard
          </button>
          <button className={styles.discard_save}>
            <ChecklistIcon size={15} />
            <span> </span>
            Save
          </button>
        </div>
      </div>
    )

  return (
    <div className={styles.main_container}>
      <div className={isMain ? styles.card_body_main : styles.card_body_sub}>
        <div
          className={
            isMain ? styles.card_user_info_main : styles.card_user_info_sub
          }
        >
          <div>
            <img src={userPic} className={styles.user_pic} />
            <span className={styles.username}>{username}</span>
            <span> </span>
            <span> - </span>
            <span>{timeStamp}</span>
          </div>
        </div>

        {editMode ? (
          editBox
        ) : (
          <div className={styles.card_content}>{content}</div>
        )}

        <div className={styles.card_buttons}>
          {editMode ? (
            <></>
          ) : (
            <div className={styles.buttons_left}>
              <div
                className={styles.reply_button}
                onClick={replyClick}
                data-testid="reply"
              >
                <CommentIcon /> Reply
              </div>
              <div className={styles.edit_delete}>
                <div onClick={editClick} data-testid="pencil">
                  <PencilIcon size={28} className={styles.pencil} />
                </div>
                <div onClick={deleteClick}>
                  <TrashIcon size={28} className={styles.trash} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {replyMode ? replyBox : <></>}
    </div>
  )
}

export default DiscussionsCard
