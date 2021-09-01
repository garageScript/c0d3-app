import { Session } from '../graphql'
const dummySessionData: Session = {
  user: {
    id: 1,
    username: 'fakeusername',
    name: 'fake user',
    email: 'fake@fakemail.com',
    isAdmin: true,
    discordUsername: '',
    discordAvatarUrl: ''
  },
  submissions: [],
  lessonStatus: []
}

export default dummySessionData
