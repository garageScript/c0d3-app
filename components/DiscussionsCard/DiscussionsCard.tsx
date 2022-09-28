import React from 'react'
import styles from './discussionsCard.module.scss'
import { CommentIcon, TrashIcon, PencilIcon } from '@primer/octicons-react'

export type DiscussionsCardProps = {
  isMain: boolean
  username: string
  userPic: string
  timeStamp: string
  content: string
  likes: number
  dislikes: number
  replyClick: () => void
  editClick: () => void
  deleteClick: () => void
}

const DiscussionsCard: React.FC<DiscussionsCardProps> = ({
  isMain,
  username,
  userPic,
  timeStamp,
  content,
  replyClick,
  editClick,
  deleteClick
}) => {
  return (
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
      <div className={styles.card_content}>{content}</div>
      <div className={styles.card_buttons}>
        <div className={styles.buttons_left}>
          <div className={styles.reply_button} onClick={replyClick}>
            <CommentIcon /> Reply
          </div>
          <div className={styles.edit_delete}>
            <div onClick={editClick}>
              <PencilIcon size={28} className={styles.pencil} />
            </div>
            <div onClick={deleteClick}>
              <TrashIcon size={28} className={styles.trash} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscussionsCard
