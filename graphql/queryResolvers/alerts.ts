import db from '../../helpers/dbload'

const { Alert } = db

export const alerts = () => {
  return Alert.findAll()
}
