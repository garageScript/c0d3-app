import db from '../dbload'
import { LoggedRequest } from '../../@types/helpers'

const { Alert } = db

type AlertData = {
  text: string
  type: string
  url?: string
  urlCaption?: string
}

export const addAlert = async (
  _parent: void,
  arg: AlertData,
  ctx: { req: LoggedRequest }
) => {
  const { req } = ctx
  try {
    const { text, type, url, urlCaption } = arg
    if (!text || !type) {
      throw new Error('Missing alert parameters')
    }
    await Alert.create({ text, type, url, urlCaption })
    return {
      success: true
    }
  } catch (err) {
    req.info('Invalid data for alert creation')
    throw new Error(err)
  }
}

export const removeAlert = async (
  _parent: void,
  arg: { id: string },
  ctx: { req: LoggedRequest }
) => {
  const { req } = ctx
  try {
    const { id } = arg
    await Alert.destroy({ where: { id } })
    return {
      success: true
    }
  } catch (err) {
    req.info('Error deleting alert')
    throw new Error(err)
  }
}
