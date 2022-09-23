import React from 'react'
import styles from './discussionsCard.module.scss'
import {
  ReplyIcon,
  ThumbsupIcon,
  ThumbsdownIcon,
  TrashIcon,
  PencilIcon
} from '@primer/octicons-react'

export type DiscussionsCardProps = {
  discussionType: 'main' | string
  username: string
  userPic: string
  timeStamp: string
  content: string
  likes: number
  dislikes: number
  expandClick: Function
  likeClick: Function
  dislikeClick: Function
}

const DiscussionsCard: React.FC<DiscussionsCardProps> = ({
  discussionType,
  username,
  userPic,
  timeStamp,
  content,
  likes,
  dislikes,
  expandClick,
  likeClick,
  dislikeClick
}) => {
  const mainType = discussionType === 'main'

  return (
    <div className={mainType ? styles.card_body_main : styles.card_body_sub}>
      <div
        className={
          mainType ? styles.card_user_info_main : styles.card_user_info_sub
        }
      >
        <div>
          <img src={userPic} className={styles.user_pic} />
          <span className={styles.username}>{username}</span>
          <span> </span>
          <span> - </span>
          <span>{timeStamp}</span>
        </div>
        <div className={styles.expand_button} onClick={expandClick()}>
          ...
        </div>
      </div>
      <div className={styles.card_content}>{content}</div>
      <div className={styles.card_buttons}>
        <div className={styles.buttons_left}>
          <div className={styles.reply_button}>
            <ReplyIcon /> Reply
          </div>
          <div className={styles.edit_delete}>
            <PencilIcon className={styles.pencil} size={28} />
            <TrashIcon className={styles.trash} size={28} />
          </div>
        </div>
        <div className={styles.likes_container}>
          <div className={styles.likes_button} onClick={likeClick()}>
            <ThumbsupIcon className={styles.thumbs_up_down} />{' '}
            <span className={styles.number_shown}>{likes}</span>
          </div>
          <div className={styles.likes_button} onClick={dislikeClick()}>
            <ThumbsdownIcon className={styles.thumbs_up_down} />{' '}
            <span className={styles.number_shown}>{dislikes}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscussionsCard
