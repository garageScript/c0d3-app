import { Session } from '../graphql'
const dummySessionData: Session = {
  user: {
    id: 1,
    username: 'fakeusername',
    name: 'fake user',
    email: 'fake@fakemail.com',
    isAdmin: true,
    discordUserId: '',
    discordUsername: '',
    discordAvatarUrl: '',
    isConnectedToDiscord: false
  },
  submissions: [],
  lessonStatus: []
}

export default dummySessionData
