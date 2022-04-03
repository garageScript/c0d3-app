import * as React from 'react'
import { SideBar } from '../../components/admin/modules/SideBar'
import { Module } from '../../graphql'
import dummyLessonData from '../../__dummy__/lessonData'

export default {
  component: SideBar,
  title: 'Components/Side'
}

const modules: Module[] = [
  {
    id: 1,
    name: 'Functions',
    content: 'Time',
    lesson: dummyLessonData[0],
    author: {
      name: 'Admin Administrator',
      isAdmin: true,
      email: 'admin@mail.com',
      id: 2,
      isConnectedToDiscord: true,
      discordAvatarUrl: 'www.goolg.c',
      discordUserId: 'Admin',
      discordUsername: 'Ad',
      username: 'Min'
    }
  },
  {
    id: 2,
    name: 'Strings',
    content: 'Air',
    lesson: dummyLessonData[0],
    author: {
      name: 'Admin Administrator',
      isAdmin: true,
      email: 'admin@mail.com',
      id: 2,
      isConnectedToDiscord: true,
      discordAvatarUrl: 'www.goolg.c',
      discordUserId: 'Admin',
      discordUsername: 'Ad',
      username: 'Min'
    }
  }
]

export const Basic: React.FC = () => (
  <SideBar modules={modules} selectedModule={0} />
)
