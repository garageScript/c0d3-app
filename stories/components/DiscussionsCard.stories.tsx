import React from 'react'
import DiscussionsCard from '../../components/DiscussionsCard/DiscussionsCard'

export default {
  title: 'Components/DiscussionsCard',
  component: DiscussionsCard
}

const discussionMainProps = {
  isMain: true,
  username: 'user01',
  userPic:
    'https://ssb.wiki.gallery/images/thumb/6/61/Ryu_SSBU.png/1200px-Ryu_SSBU.png',
  timeStamp: 'September 22, 2022 @ 3:00 UTC',
  content:
    'dark mode will be a good feature to implement , if i will get time from exams , i will try for sure :shipit:. dark mode will be a good feature to implement , if i will get time from exams , i will try for sure :shipit:. Lorem ipsum, dark mode will be a good feature to implement , if i will get time from exams , i will try for sure :shipit: dark mode will be a good feature to implement , if i will get time from exams , i will try for sure :shipit:. Lorem ipsum, dark mode will be a good feature to implement , if i will get time from exams , i will try for sure :shipit:Lorem ipsum, dark mode will be a good feature to implement , if i will get time from exams , i will try for sure :shipit:',
  likes: 9,
  dislikes: 2,
  replyClick: () => {},
  editClick: () => {},
  deleteClick: () => {}
}

const discussionSubProps = {
  isMain: false,
  username: 'user01',
  userPic:
    'https://ssb.wiki.gallery/images/thumb/6/61/Ryu_SSBU.png/1200px-Ryu_SSBU.png',
  timeStamp: 'September 22, 2022 @ 3:00 UTC',
  content:
    'dark mode will be a good feature to implement , if i will get time from exams , i will try for sure :shipit:. dark mode will be a good feature to implement , if i will get time from exams , i will try for sure :shipit:. Lorem ipsum, dark mode will be a good feature to implement , if i will get time from exams , i will try for sure :shipit: dark mode will be a good feature to implement , if i will get time from exams , i will try for sure :shipit:. Lorem ipsum, dark mode will be a good feature to implement , if i will get time from exams , i will try for sure :shipit:Lorem ipsum, dark mode will be a good feature to implement , if i will get time from exams , i will try for sure :shipit:',
  likes: 20,
  dislikes: 3,
  replyClick: () => {},
  editClick: () => {},
  deleteClick: () => {}
}

export const DiscussionsCardMain: React.FC = () => (
  <DiscussionsCard {...discussionMainProps} />
)

export const DiscussionsCardSub: React.FC = () => (
  <DiscussionsCard {...discussionSubProps} />
)
