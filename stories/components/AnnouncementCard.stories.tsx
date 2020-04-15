import * as React from 'react'
import AnnouncementCard from '../../components/AnnouncementCard'

export default {
  component: AnnouncementCard,
  title: 'Components/AnnouncementCard'
}

const announcements = [
  'To make space for other students on our servers, your account will be deleted after 30 days of inactivity.',
  'Take each lesson challenge seriously and do them over and over again until you can solve them. With the exception End to End, all challenges are questions and exercises taken from real interviews.',
  'This lesson will not only prepare you for interviews, but it will also help teach you the skills that you need to become an effective engineer.',
  'After completing Foundations of JavaScript, Variables & Functions, Array, Objects, End to End, HTML/CSS/JavaScript, React/GraphQL/SocketIO, you will be technically ready to contribute to our codebase.'
]

export const Basic: React.FC = () => (
  <AnnouncementCard announcements={announcements} />
)
