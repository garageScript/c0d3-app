import db from './dbload'
const { User } = db

export default async (userOrEmail: string) => {
  if (userOrEmail.indexOf('@') !== -1) {
    return User.findOne({
      where: { email: userOrEmail }
    })
  }
  return User.findOne({
    where: { username: userOrEmail }
  })
}
